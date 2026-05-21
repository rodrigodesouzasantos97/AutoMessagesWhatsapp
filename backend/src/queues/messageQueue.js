import { Queue } from "bullmq";

import { connection } from "./connection.js";

export const messageQueue = new Queue("messages", {
  connection,
});