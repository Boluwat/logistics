"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = exports.packageRoute = exports.userRoute = void 0;
const user_route_1 = __importDefault(require("./user.route"));
exports.userRoute = user_route_1.default;
const package_route_1 = __importDefault(require("./package.route"));
exports.packageRoute = package_route_1.default;
const route_1 = __importDefault(require("./route"));
exports.routes = route_1.default;
