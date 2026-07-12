import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

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

// Helper to send email via Nodemailer
async function sendContactEmail(contact: {
  name: string;
  phone: string;
  type: string;
  message: string;
  email?: string;
  city?: string;
  preference?: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const emailTo = process.env.EMAIL_TO || "contact@axa-elomrani.ma";

  if (!host || !user || !pass) {
    console.warn("SMTP configuration is missing. Email not sent. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in secrets.");
    return { sent: false, reason: "SMTP credentials not configured" };
  }

  const transporter = nodemailer.createTransport({
    host: host,
    port: parseInt(port || "587"),
    secure: port === "465", // true for 465, false for other ports
    auth: {
      user: user,
      pass: pass,
    },
  });

  const subject = `[Nouveau Lead Devis] - ${contact.name} (${contact.type})`;
  
  const textContent = `
Nouveau contact reçu depuis le site d'Assurances ELOMRANI :

Nom complet : ${contact.name}
Téléphone : +212 ${contact.phone}
Email du client : ${contact.email || "Non renseigné"}
Ville : ${contact.city || "Casablanca"}
Type d'assurance : ${contact.type}
Préférence de contact : ${contact.preference || "Téléphone"}

Message / Détails :
${contact.message}

---
Cet e-mail a été envoyé automatiquement depuis le système de devis d'Assurances ELOMRANI.
  `.trim();

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #0F3F99; padding: 24px; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 20px; font-weight: bold; letter-spacing: 0.05em; text-transform: uppercase;">Nouveau Lead Devis</h2>
        <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.8;">Assurances ELOMRANI - Agent Général AXA</p>
      </div>
      <div style="padding: 24px; background-color: #ffffff; color: #1e293b; line-height: 1.6;">
        <p style="margin-top: 0; font-size: 16px;">Bonjour,</p>
        <p style="font-size: 15px;">Une nouvelle demande de devis personnalisé vient d'être soumise sur votre site internet :</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px 14px; font-weight: bold; width: 35%; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0F3F99;">Nom Complet</td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 14px;">${contact.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: bold; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0F3F99;">Téléphone</td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: bold;">+212 ${contact.phone}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px 14px; font-weight: bold; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0F3F99;">Adresse E-mail</td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 14px;"><a href="mailto:${contact.email || ""}" style="color: #E01A22; text-decoration: none;">${contact.email || "Non renseignée"}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: bold; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0F3F99;">Ville</td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 14px;">${contact.city || "Casablanca"}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 10px 14px; font-weight: bold; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0F3F99;">Assurance</td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 14px; font-weight: bold; color: #E01A22;">${contact.type}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; font-weight: bold; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #0F3F99;">Canal préféré</td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 14px; text-transform: capitalize;">${contact.preference || "Téléphone"}</td>
          </tr>
        </table>

        <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; border-left: 4px solid #0F3F99; margin-top: 20px;">
          <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #0f172a;">Message / Besoins du client :</h4>
          <p style="margin: 0; font-size: 13.5px; white-space: pre-wrap; color: #334155;">${contact.message || "Aucun message spécifique fourni."}</p>
        </div>

        <p style="margin-top: 24px; font-size: 14px; color: #64748b;">
          N'oubliez pas de recontacter ce client rapidement pour lui proposer une formule d'assurance adaptée.
        </p>
      </div>
      <div style="background-color: #f8fafc; padding: 16px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8;">
        Cet e-mail a été envoyé de manière automatisée depuis la plateforme de contact d'Assurances ELOMRANI.
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"${contact.name}" <${user}>`,
    replyTo: contact.email || user,
    to: emailTo,
    subject: subject,
    text: textContent,
    html: htmlContent,
  });

  return { sent: true };
}

// REST API Endpoints
app.post("/api/contact", async (req, res) => {
  const { name, phone, type, message, email, city, preference, client_message } = req.body;
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

    let emailStatus = { sent: false, reason: "SMTP credentials not configured" };
    try {
      emailStatus = await sendContactEmail({
        name: name || "Client Mobile",
        phone: phone,
        type: type || "Rappel Direct",
        message: client_message || "Aucun message spécifique fourni.",
        email,
        city,
        preference
      });
    } catch (emailErr) {
      console.error("Nodemailer dispatch failed:", emailErr);
      emailStatus = { sent: false, reason: String(emailErr) };
    }

    res.json({ 
      success: true, 
      message: "Votre demande de rappel a bien été enregistrée !", 
      data: contact,
      emailSent: emailStatus.sent,
      emailReason: emailStatus.sent ? undefined : emailStatus.reason
    });
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
