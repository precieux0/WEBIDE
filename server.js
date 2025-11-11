import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- Route principale pour tester ---
app.get("/", (req, res) => {
  res.send("✅ WEBIDE server is running with Gemini AI");
});

// --- Route IA (Gemini) ---
app.post("/api/ai", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2-0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const aiResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "Aucune réponse IA";

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error("Erreur Gemini:", error);
    res.status(500).json({ error: "Erreur lors de la requête à Gemini" });
  }
});

// --- Démarrer le serveur ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 WEBIDE running on port ${PORT}`);
});
