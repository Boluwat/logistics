"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpController = exports.loginController = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const response_format_1 = require("../utils/response-format");
const create_user_service_1 = require("../services/create-user.service");
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const response = await (0, create_user_service_1.loginUser)({ email, password });
        if (!response.isSuccess) {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    }
    catch (err) {
        logger_1.default.error(err);
        return res
            .status(400)
            .json((0, response_format_1.formatResponse)({ message: "You just hit a break wall" }));
    }
};
exports.loginController = loginController;
const signUpController = async (req, res) => {
    try {
        const { email, password, lastname, firstname, phone } = req.body;
        const response = await (0, create_user_service_1.createUser)({
            email,
            password,
            lastname,
            firstname,
            phone,
        });
        if (!response.isSuccess) {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    }
    catch (err) {
        logger_1.default.error(err);
        return res
            .status(400)
            .json((0, response_format_1.formatResponse)({ message: "You just hit a break wall" }));
    }
};
exports.signUpController = signUpController;
