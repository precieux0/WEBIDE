# 💻 WEBIDE — Multi-language AI-powered Web IDE

Bienvenue sur **WEBIDE**, un environnement de développement complet en ligne inspiré de VS Code et Android Studio.  
Ce projet te permet d’écrire, exécuter, sauvegarder et analyser du code en plusieurs langages, directement depuis ton navigateur 🌐  
Le tout avec une **intégration IA (Gemini)** pour t’aider à apprendre, corriger et générer du code.

---

## 🚀 Fonctionnalités

✅ **Éditeur multi-langages** (JavaScript, Python, C, C++, Java, PHP, HTML, CSS...)  
✅ **Exécution directe dans le navigateur** (via serveur Node)  
✅ **Sauvegarde automatique** (locale + serveur)  
✅ **Assistant IA intégré** (Gemini API)  
✅ **Interface claire, fluide et responsive**  
✅ **Déploiement Docker sur Render**  
✅ **Architecture extensible** (ajout futur : build APK, exécution mobile...)

---

## 🧱 Structure du projet

```
webide/
├── public/
│   ├── index.html       # Interface principale
│   ├── style.css        # Design clair et fluide
│   └── app.js           # Logique front-end + IA + exécution
├── data/
│   └── .keep            # Placeholder pour les sauvegardes
├── server.js            # Serveur Node (Express + API Gemini)
├── Dockerfile           # Déploiement automatique sur Render
├── .env                 # Variables d'environnement locales (non versionné)
├── .gitignore           # Fichiers ignorés
└── README.md            # Ce fichier 😄
```

---

## ⚙️ Installation locale

### 1️⃣ Cloner le dépôt
```bash
git clone https://github.com/precieux0/WEBIDE.git
cd WEBIDE
```

### 2️⃣ Installer les dépendances
```bash
npm install express cors dotenv
```

### 3️⃣ Ajouter ton fichier `.env`
Crée un fichier `.env` à la racine :
```
GEMINI_API_KEY=ta_cle_depuis_Google_AI_Studio
```

### 4️⃣ Lancer le serveur
```bash
node server.js
```

Puis ouvre ton navigateur sur :  
👉 [http://localhost:3000](http://localhost:3000)

---

## ☁️ Déploiement sur Render

1️⃣ Pousse ton code sur GitHub  
2️⃣ Crée un **nouveau Web Service** sur [Render.com](https://render.com)  
3️⃣ Sélectionne ton dépôt `precieux0/WEBIDE`  
4️⃣ Choisis **Environment = Docker**  
5️⃣ Laisse **Build command** et **Start command** vides  
6️⃣ Ajoute ta variable d’environnement :
```
GEMINI_API_KEY = ta_cle_depuis_Google_AI_Studio
```
7️⃣ Déploie 🚀  

Ton app sera accessible sur :  
👉 **https://webide.onrender.com**

---

## 🧠 IA intégrée (Gemini)

Tu peux poser directement des questions à l’IA dans l’interface (section 💡 “Demander à l’IA”).  
L’IA t’aide à :
- Comprendre ton code  
- Corriger les erreurs  
- Proposer des améliorations  
- Générer des exemples pédagogiques  

---

## 🧩 Améliorations futures

🔹 Build automatique d’APK Android  
🔹 Système d’enseignement interactif par IA  
🔹 Compilation distribuée multi-serveurs  
🔹 Chat collaboratif intégré  
🔹 Thèmes personnalisables (clair/sombre, style VSCode)

---

## 👨‍💻 Auteur

**Precieux0**  
📎 GitHub : [https://github.com/precieux0](https://github.com/precieux0)  
💬 Projet WEBIDE — créé avec ❤️ et Node.js

---

## 📜 Licence

Ce projet est open-source sous la licence **MIT**.  
Tu es libre de l’utiliser, le modifier et le partager !
