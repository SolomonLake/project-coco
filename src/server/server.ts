import http from "http";
import express from "express";
import { applyMiddleware } from "./utils/applyMiddleware";
import { applyRoutes } from "./utils/applyRoutes";
import { middleware } from "./middleware/middleware";
import { servicesRoutes } from "./services/servicesRoutes";
import { webAppsRoutes } from "./webApps/webAppsRoutes";

const router = express();
applyMiddleware(middleware, router);
applyRoutes(servicesRoutes, router);
applyRoutes(webAppsRoutes, router);

const { PORT = 3002 } = process.env;
const server = http.createServer(router);

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`),
);
