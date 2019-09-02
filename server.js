"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var applyMiddleware_1 = require("./utils/applyMiddleware");
var applyRoutes_1 = require("./utils/applyRoutes");
var middleware_1 = require("./middleware/middleware");
var servicesRoutes_1 = require("./services/servicesRoutes");
var webAppsRoutes_1 = require("./webApps/webAppsRoutes");
var router = express_1.default();
applyMiddleware_1.applyMiddleware(middleware_1.middleware, router);
applyRoutes_1.applyRoutes(servicesRoutes_1.servicesRoutes, router);
applyRoutes_1.applyRoutes(webAppsRoutes_1.webAppsRoutes, router);
var _a = process.env.PORT, PORT = _a === void 0 ? 3002 : _a;
var server = http_1.default.createServer(router);
server.listen(PORT, function () {
    return console.log("Server is running http://localhost:" + PORT + "...");
});
//# sourceMappingURL=server.js.map