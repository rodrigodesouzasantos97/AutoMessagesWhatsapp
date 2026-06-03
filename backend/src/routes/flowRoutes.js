import { Router } from "express";

import {
  createFlow,
  startFlow,
  getFlows,
  getFlow,
} from "../controllers/flowController.js";

const router = Router();

router.get("/", getFlows);

router.get("/:id", getFlow);

router.post("/", createFlow);

router.post("/:flowId/start", startFlow);

export default router;
