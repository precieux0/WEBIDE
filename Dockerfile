# ---- Étape 1 : image Node officielle ----
FROM node:18-alpine

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm install --omit=dev
# Copier le reste du code
COPY . .

# Exposer le port utilisé par ton app
EXPOSE 3000

# Lancer le serveur
CMD ["npm", "start"]
