"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./logger"));
const response_format_1 = require("./response-format");
const constants_1 = __importDefault(require("./constants"));
const sign = (data) => {
    return jsonwebtoken_1.default.sign(data, config_1.default.jwtSecret, { expiresIn: "1440m" });
};
exports.sign = sign;
const verify = (authorizationHeader) => {
    try {
        if (!authorizationHeader) {
            return (0, response_format_1.formatResponse)({
                isSuccess: false,
                message: constants_1.default.errorMessage.Unauthorized,
            });
        }
        const parts = authorizationHeader.split(" ");
        if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
            return (0, response_format_1.formatResponse)({
                isSuccess: false,
                message: constants_1.default.errorMessage.Unauthorized,
            });
        }
        const token = parts[1];
        const payload = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        return (0, response_format_1.formatResponse)({ isSuccess: true, data: payload });
    }
    catch (err) {
        return (0, response_format_1.formatResponse)({ isSuccess: false, message: constants_1.default.errorMessage.Unauthorized, });
        logger_1.default.error(err);
    }
};
exports.verify = verify;
