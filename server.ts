import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import dotenv from "dotenv";

dotenv.config();

const db = new Database("insurance.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    type TEXT NOT NULL,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/contact", (req, res) => {
    const { name, phone, type, message } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO contacts (name, phone, type, message) VALUES (?, ?, ?, ?)");
      stmt.run(name, phone, type, message);
      res.json({ success: true, message: "Demande envoyée avec succès !" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ success: false, message: "Erreur lors de l'enregistrement de la demande." });
    }
  });

  app.get("/api/contacts", (req, res) => {
    // Basic security: check for a simple secret or just for dev purposes
    try {
      const contacts = db.prepare("SELECT * FROM contacts ORDER BY created_at DESC").all();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ success: false });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
