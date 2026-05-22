import dotenv from "dotenv";

import dns from "dns";

import connectDB from "./src/config/db.js";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

connectDB();

import "./src/workers/messageWorker.js";

console.log("Worker iniciado!");
