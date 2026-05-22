import { Router } from "express";

import {
  createFlow,
  startFlow,
} from "../controllers/flowController.js";

const router = Router();

router.post("/", createFlow);

router.post("/:flowId/start", startFlow);

export default router;