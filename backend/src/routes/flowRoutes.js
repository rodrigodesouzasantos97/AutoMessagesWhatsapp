import { Router } from "express";

import { createFlow } from "../controllers/flowController.js";

const router = Router();

router.post("/", createFlow);

export default router;