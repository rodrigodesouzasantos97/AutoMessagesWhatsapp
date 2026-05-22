import IORedis from "ioredis";

export const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,

  maxRetriesPerRequest: null,
});

connection.on("connect", () => {
  console.log("Redis conectado!");
});

connection.on("error", (err) => {
  console.log("Erro Redis:", err);
});