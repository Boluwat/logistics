import { Application } from "express";
import config from "./utils/config";
import logger from "./utils/logger";
import { connectDatabase } from "./utils/database";
import BootstrapServer from "./utils/bootstrap";
import './utils/cronjob';

async function startServer() {
  const app: Application = BootstrapServer();
  const port = config.port;

  try {
      await connectDatabase();
      const server = app.listen(port, () => {
          logger.info(`Server is running on port ${port}`);
      });
      return server;
  } catch (error) {
      logger.error('Failed to connect to the database:', error);
      // process.exit(1); // Exit the process if unable to connect to the database
  }
}

startServer();
