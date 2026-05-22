import dotenv from "dotenv";

import dns from "dns";

import connectDB from "./src/config/db.js";

import { startWPP }
  from "./src/services/wpp/wppClient.js";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

await connectDB();

await startWPP();

import "./src/workers/messageWorker.js";

console.log("Worker iniciado!");