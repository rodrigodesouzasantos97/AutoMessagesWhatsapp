import { Worker } from "bullmq";

import { connection } from "../queues/connection.js";

import Contact from "../models/Contact.js";
import FlowStep from "../models/FlowStep.js";

import { sendMessage } from "../services/sendMessage.js";

export const worker = new Worker(
  "messages",

  async (job) => {
    console.log("JOB RECEBIDO");
    console.log(job.data);

    const {
      contactId,
      stepId,
    } = job.data;

    console.log("Buscando contato...");

    const contact =
      await Contact.findById(contactId);

    console.log("Contato:", contact);

    console.log("Buscando step...");

    const step =
      await FlowStep.findById(stepId);

    console.log("Step:", step);

    if (!contact || !step) {
      console.log("Contato ou step não encontrados");

      return;
    }

    await sendMessage(
      contact.phone,
      step.message
    );
  },

  {
    connection,
  }
);
