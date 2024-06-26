"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("../routes");
const BootstrapServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    (0, routes_1.routes)(app);
    return app;
};
exports.default = BootstrapServer;
