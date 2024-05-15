"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackPackage = exports.updatePackageController = exports.createPackageController = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const response_format_1 = require("../utils/response-format");
const packages_service_1 = require("../services/packages.service");
const tokenizer_1 = require("../utils/tokenizer");
const createPackageController = async (req, res) => {
    try {
        const authorizationHeader = req.headers["authorization"];
        const validationResponse = (0, tokenizer_1.verify)(authorizationHeader);
        if (!validationResponse.isSuccess) {
            return res.status(400).json(validationResponse);
        }
        const payload = validationResponse.data;
        if (!payload || !payload.id) {
            return res
                .status(401)
                .json((0, response_format_1.formatResponse)({ isSuccess: false, message: "Unauthorized" }));
        }
        const currentUser = { id: payload.id };
        const response = await (0, packages_service_1.createPackageService)(req.body, currentUser);
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
exports.createPackageController = createPackageController;
const updatePackageController = async (req, res) => {
    try {
        const authorizationHeader = req.headers["authorization"];
        const validationResponse = (0, tokenizer_1.verify)(authorizationHeader);
        if (!validationResponse.isSuccess) {
            return res.status(400).json(validationResponse);
        }
        const packageId = Number(req.params.id);
        const response = await (0, packages_service_1.updatePackageService)(req.body, packageId);
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
exports.updatePackageController = updatePackageController;
const trackPackage = async (req, res) => {
    try {
        const authorizationHeader = req.headers["authorization"];
        const validationResponse = (0, tokenizer_1.verify)(authorizationHeader);
        if (!validationResponse.isSuccess) {
            return res.status(400).json(validationResponse);
        }
        const response = await (0, packages_service_1.trackPackagesService)(req.params.trackingId);
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
exports.trackPackage = trackPackage;
