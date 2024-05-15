"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackPackagesService = exports.updatePackageService = exports.createPackageService = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const response_format_1 = require("../utils/response-format");
const database_1 = require("../utils/database");
const interfaces_1 = require("../interfaces");
const uuid_1 = require("uuid");
const createPackageService = async (payload, currentUser) => {
    try {
        const db = await (0, database_1.connectDatabase)();
        const newPackage = Object.assign(Object.assign({}, payload), { status: interfaces_1.PackageStatus.Pending, userId: currentUser.id, trackingId: (0, uuid_1.v4)() });
        const packages = await db.run("INSERT INTO packages (name, status, pickUpDate, userId, trackingId) VALUES (?, ?, ?, ?, ?)", [
            newPackage.name,
            newPackage.status,
            newPackage.pickUpDate,
            newPackage.userId,
            newPackage.trackingId,
        ]);
        const response = packages.lastID;
        const newPackages = await db.get("SELECT * FROM packages WHERE id = ?", response);
        return (0, response_format_1.formatResponse)({
            isSuccess: true,
            data: newPackages,
            message: "Success",
        });
    }
    catch (err) {
        logger_1.default.error(err);
        return (0, response_format_1.formatResponse)({
            isSuccess: false,
            message: "You just hit a break wall",
        });
    }
};
exports.createPackageService = createPackageService;
const updatePackageService = async (payload, id) => {
    try {
        const db = await (0, database_1.connectDatabase)();
        const packageToUpdate = await db.get("SELECT * FROM packages WHERE id = ?", id);
        if (!packageToUpdate) {
            return (0, response_format_1.formatResponse)({
                isSuccess: false,
                message: "Package records not found",
            });
        }
        const updatedPackage = Object.assign(Object.assign({}, packageToUpdate), payload);
        await db.run("UPDATE packages SET name = ?, pickUpDate = ? WHERE id = ?", [
            updatedPackage.name,
            updatedPackage.pickUpDate,
            id,
        ]);
        const newPackage = await db.get("SELECT * FROM packages WHERE id = ?", id);
        return (0, response_format_1.formatResponse)({
            isSuccess: true,
            data: newPackage,
            message: "Package updated successfully",
        });
    }
    catch (err) {
        logger_1.default.error(err);
        return (0, response_format_1.formatResponse)({
            isSuccess: false,
            message: "Something went wrong",
        });
    }
};
exports.updatePackageService = updatePackageService;
const trackPackagesService = async (trackingId) => {
    try {
        const db = await (0, database_1.connectDatabase)();
        const packages = await db.all("SELECT * FROM packages WHERE trackingId = ?", trackingId);
        return (0, response_format_1.formatResponse)({
            isSuccess: true,
            data: packages
        });
    }
    catch (error) {
        logger_1.default.error(error);
        return (0, response_format_1.formatResponse)({
            message: "Something went wrong!",
        });
    }
};
exports.trackPackagesService = trackPackagesService;
