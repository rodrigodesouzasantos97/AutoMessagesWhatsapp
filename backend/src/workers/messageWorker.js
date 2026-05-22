import { Worker } from "bullmq";

import { connection } from "../queues/connection.js";

export const worker = new Worker(
  "messages",
  async (job) => {
    console.log("==============");
    console.log("JOB RECEBIDO");
    console.log(job.name);
    console.log(job.data);
    console.log("==============");
  },
  {
    connection,
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} concluído!`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} falhou!`);
  console.log(err);
});