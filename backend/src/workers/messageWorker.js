import { Worker } from "bullmq";

import { connection } from "../queues/connection.js";

export const worker = new Worker(
  "messages",
  async (job) => {
    console.log("JOB RECEBIDO:");
    console.log(job.data);
  },
  {
    connection,
  }
);