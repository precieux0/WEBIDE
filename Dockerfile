FROM node:18
WORKDIR /app
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
