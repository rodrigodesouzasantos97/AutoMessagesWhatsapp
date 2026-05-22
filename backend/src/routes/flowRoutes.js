import { Router } from "express";

import { createFlow, startFlow, getFlows } from "../controllers/flowController.js";

const router = Router();

router.get("/", getFlows);

router.post("/", createFlow);

router.post("/:flowId/start", startFlow);

export default router;
