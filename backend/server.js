import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";

import app from "./src/app.js";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo conectado!");

    app.listen(process.env.PORT, () => {
      console.log("Servidor rodando!");
    });
  })
  .catch((err) => console.log(err));