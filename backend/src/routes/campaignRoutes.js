import { Router } from "express";

import {
  createCampaign,
} from "../controllers/campaignController.js";

const router = Router();

router.post("/", createCampaign);

export default router;