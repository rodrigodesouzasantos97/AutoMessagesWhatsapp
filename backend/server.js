import dotenv from "dotenv";
import mongoose from "mongoose";

import app from "./src/app.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo conectado!");

    app.listen(3000, () => {
      console.log("Servidor rodando!");
    });
  })
  .catch((err) => console.log(err));