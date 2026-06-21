import { Router } from "express";

import {
  createFlow,
  deleteFlow,
  startFlow,
  getFlows,
  getFlow,
  getFlowSteps,
  getSteps
} from "../controllers/flowController.js";

const router = Router();

router.get("/", getFlows);

router.get("/steps", getSteps);

router.get("/:flowId/steps", getFlowSteps);

router.get("/:id", getFlow);

router.delete("/:id", deleteFlow);

router.post("/", createFlow);

router.post("/:flowId/start", startFlow);


export default router;
