import { Router } from "express";

import upload from "../config/multer.js";

import {
  importContacts,
} from "../controllers/contactController.js";

const router = Router();

router.post(
  "/import",

  upload.single("file"),

  importContacts
);

export default router;