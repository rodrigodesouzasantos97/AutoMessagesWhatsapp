import dotenv from "dotenv";

import dns from "dns";

import app from "./src/app.js";

import connectDB from "./src/config/db.js";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

connectDB();

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando!");
});