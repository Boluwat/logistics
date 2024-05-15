import express, { Application } from "express";
import { routes } from "../routes";

const BootstrapServer = (): Application => {
  const app = express();

  app.use(express.json());

  routes(app);

  return app;
};

export default BootstrapServer;
