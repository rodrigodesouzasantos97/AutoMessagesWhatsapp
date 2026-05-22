import express from "express";
import cors from "cors";

import flowRoutes from "./routes/flowRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/flows", flowRoutes);
app.use("/contacts", contactRoutes);
app.use("/campaigns", campaignRoutes);

export default app;