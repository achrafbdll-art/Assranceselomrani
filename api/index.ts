import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());

// Resilient database initialization for both development and serverless hosting environments.
// If better-sqlite3 native bindings fail to load, we fall back gracefully to flat JSON persistence.
interface Contact {
  id?: number;
  name: string;
  phone: string;
  type: string;
  message?: string;
  created_at?: string;
}

class DbProvider {
  private useJsonStore = false;
  private sqliteDb: any = null;
  private jsonPath = "";

  constructor() {
    this.jsonPath = process.env.NODE_ENV === "production"
      ? "/tmp/insurance-contacts.json"
      : path.join(process.cwd(), "insurance-contacts.json");

    try {
      // Dynamic import to handle environments where better-sqlite3 cannot compile or isn't needed
      const sqliteName = "better-sqlite3";
      const Database = require(sqliteName);
      const dbPath = process.env.NODE_ENV === "production" ? "/tmp/insurance.db" : "insurance.db";
      this.sqliteDb = new Database(dbPath);
      this.sqliteDb.exec(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          type TEXT NOT NULL,
          message TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("SQLite success: Database initialized utilizing better-sqlite3.");
    } catch (err) {
      console.warn("SQLite failed to initialize, falling back to local JSON persistence:", err);
      this.useJsonStore = true;
      if (!fs.existsSync(this.jsonPath)) {
        try {
          fs.writeFileSync(this.jsonPath, JSON.stringify([], null, 2));
        } catch (writeErr) {
          console.error("Failed to write initial JSON file:", writeErr);
        }
      }
    }
  }

  public insertContact(contact: Omit<Contact, "id" | "created_at">): Contact {
    if (this.useJsonStore) {
      try {
        let contacts: Contact[] = [];
        if (fs.existsSync(this.jsonPath)) {
          const raw = fs.readFileSync(this.jsonPath, "utf-8");
          contacts = JSON.parse(raw);
        }
        const newContact: Contact = {
          ...contact,
          id: contacts.length + 1,
          created_at: new Date().toISOString()
        };
        contacts.push(newContact);
        fs.writeFileSync(this.jsonPath, JSON.stringify(contacts, null, 2));
        return newContact;
      } catch (err) {
        console.error("JSON store insert failure:", err);
        throw err;
      }
    } else {
      const stmt = this.sqliteDb.prepare(
        "INSERT INTO contacts (name, phone, type, message) VALUES (?, ?, ?, ?)"
      );
      const info = stmt.run(contact.name, contact.phone, contact.type, contact.message || null);
      return {
        id: Number(info.lastInsertRowid),
        ...contact,
        created_at: new Date().toISOString()
      };
    }
  }

  public getContacts(): Contact[] {
    if (this.useJsonStore) {
      try {
        if (!fs.existsSync(this.jsonPath)) {
          return [];
        }
        const raw = fs.readFileSync(this.jsonPath, "utf-8");
        return JSON.parse(raw);
      } catch (err) {
        console.error("JSON store fetch failure:", err);
        return [];
      }
    } else {
      try {
        return this.sqliteDb.prepare("SELECT * FROM contacts ORDER BY created_at DESC").all();
      } catch (err) {
        console.error("SQLite query execution failure:", err);
        return [];
      }
    }
  }
}

const dbProvider = new DbProvider();

// Initialize the Google Gemini API client lazily on first access.
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

// REST API Endpoints
app.post("/api/contact", (req, res) => {
  const { name, phone, type, message } = req.body;
  if (!phone) {
    return res.status(400).json({ success: false, message: "Numéro de téléphone mobile requis." });
  }

  try {
    const contact = dbProvider.insertContact({
      name: name || "Client Mobile",
      phone: phone,
      type: type || "Rappel Direct",
      message: message || "Demande de rappel rapide"
    });
    res.json({ success: true, message: "Votre demande de rappel a bien été enregistrée !", data: contact });
  } catch (error) {
    console.error("Failed to insert contact:", error);
    res.status(500).json({ success: false, message: "Erreur lors de l'enregistrement de la demande." });
  }
});

app.get("/api/contacts", (req, res) => {
  try {
    const contacts = dbProvider.getContacts();
    res.json(contacts);
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    res.status(500).json({ success: false, message: "Impossible de récupérer les contacts." });
  }
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, error: "Le message est requis" });
  }

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          role: "user",
          parts: [{
            text: `Tu es l'assistant virtuel de l'agence d'assurance ELOMRANI, agent général AXA à Casablanca. 
            Réponds aux questions des clients sur les assurances (Auto, Habitation, Santé, Pro, Épargne).
            Sois professionnel, accueillant et concis. 
            Si on te demande des coordonnées : 
            - Adresse : 108 Bd Ali Yaâta, Casablanca 20250
            - Téléphone : 05 22 66 59 08
            - Email : contact@axa-elomrani.ma
            L'agent général est Mme FATIMA EL OMRANI.

            Question du client : ${message}`
          }]
        }
      ],
    });

    const reply = response.text || "Désolé, je n'ai pas pu traiter votre demande. Veuillez nous contacter directement.";
    res.json({ reply });
  } catch (error) {
    console.error("Gemini API server proxy error:", error);
    res.status(500).json({ success: false, error: "Une erreur est survenue lors de la communication avec l'assistant." });
  }
});

export default app;
