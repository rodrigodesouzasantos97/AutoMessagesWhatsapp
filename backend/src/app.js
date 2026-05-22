import express from "express";
import cors from "cors";

import flowRoutes from "./routes/flowRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/flows", flowRoutes);

export default app;