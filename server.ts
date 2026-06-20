import app from "./api/index";
import { createServer as createViteServer } from "vite";
import path from "path";
import express from "express";

async function startServer() {
  const PORT = 3000;

  // Serve static files and handle routing depending on environment
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // Let vite handle the rest of the requests
    app.use(vite.middlewares);
  } else {
    // Serve client static production build
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Development / Production server running on http://localhost:${PORT}`);
  });
}

startServer();
