/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";

let server: Server;

const dbUrl = config.db_url as string;

const main = async () => {
  try {
    await mongoose.connect(dbUrl);
    server = app.listen(config.port, () => {
      console.log(`SERVER IS RUNNING ON ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

main();

process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection is detected. Shutting down server...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception is detected. Shutting down server...`, err);

  process.exit(1);
});
