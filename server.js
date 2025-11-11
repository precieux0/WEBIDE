import express from "express";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import https from "https";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// ========== IA Gemini ==========
app.post("/ai", (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;
  const data = JSON.stringify({
    contents: [{ parts: [{ text: prompt }]}],
  });

  const options = {
    hostname: "generativelanguage.googleapis.com",
    path: "/v1beta/models/gemini-2-0-flash:generateContent",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const request = https.request(options, (response) => {
    let body = "";
    response.on("data", (chunk) => (body += chunk));
    response.on("end", () => {
      try {
        const result = JSON.parse(body);
        res.json(result);
      } catch {
        res.status(500).send("Erreur IA");
      }
    });
  });

  request.on("error", () => res.status(500).send("Erreur de requête IA"));
  request.write(data);
  request.end();
});

// ========== Exécution multi-langage ==========
app.post("/run", (req, res) => {
  const { language, code } = req.body;
  const tmpDir = "/tmp";
  const fileMap = {
    js: "script.js",
    py: "script.py",
    cpp: "main.cpp",
    c: "main.c",
    java: "Main.java",
    php: "index.php",
  };
  const filename = fileMap[language];
  if (!filename) return res.status(400).send("Langage non supporté.");

  const filePath = path.join(tmpDir, filename);
  fs.writeFileSync(filePath, code);

  let cmd;
  switch (language) {
    case "js": cmd = `node ${filePath}`; break;
    case "py": cmd = `python3 ${filePath}`; break;
    case "cpp": cmd = `g++ ${filePath} -o ${tmpDir}/a.out && ${tmpDir}/a.out`; break;
    case "c": cmd = `gcc ${filePath} -o ${tmpDir}/a.out && ${tmpDir}/a.out`; break;
    case "java": cmd = `javac ${filePath} && java -cp ${tmpDir} Main`; break;
    case "php": cmd = `php ${filePath}`; break;
  }

  exec(cmd, { timeout: 5000 }, (err, stdout, stderr) => {
    if (err) return res.send(stderr || err.message);
    res.send(stdout || "✅ Exécution terminée.");
  });
});

// ========== Sauvegarde / Chargement ==========
app.post("/save", (req, res) => {
  const { language, code } = req.body;
  if (!language || !code) return res.status(400).send("Requête invalide.");

  const saveDir = path.join("data", "saved");
  if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });

  const filePath = path.join(saveDir, `${language}.txt`);
  fs.writeFileSync(filePath, code);
  res.json({ message: `💾 Code ${language} sauvegardé.` });
});

app.get("/load/:language", (req, res) => {
  const lang = req.params.language;
  const filePath = path.join("data", "saved", `${lang}.txt`);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Aucune sauvegarde." });

  const code = fs.readFileSync(filePath, "utf8");
  res.json({ code });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur IDE sur http://localhost:${PORT}`));
