import { Router } from "express";

import upload from "../config/multer.js";

import {
  importContacts,
  getContacts,
  deleteContact,
  updateContact,
} from "../controllers/contactController.js";

const router = Router();

router.get("/", getContacts);

router.post(
  "/import",

  upload.single("file"),

  importContacts,
);

router.delete("/:id", deleteContact);

router.patch("/:id", updateContact);

export default router;
