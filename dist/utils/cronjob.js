"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackageStatusService = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const database_1 = require("../utils/database");
const logger_1 = __importDefault(require("../utils/logger"));
const interfaces_1 = require("../interfaces");
const updatePackageStatusService = async () => {
    try {
        const db = await (0, database_1.connectDatabase)();
        const packages = await db.all("SELECT * FROM packages WHERE status != ?", interfaces_1.PackageStatus.Delivered);
        for (const pack of packages) {
            if (pack.status === interfaces_1.PackageStatus.InTransit) {
                await db.run("UPDATE packages SET status = ? WHERE id = ?", [
                    interfaces_1.PackageStatus.ReadyForPickup,
                    pack.id,
                ]);
            }
            if (pack.status === interfaces_1.PackageStatus.Pending) {
                await db.run("UPDATE packages SET status = ? WHERE id = ?", [
                    interfaces_1.PackageStatus.OutForDelivery,
                    pack.id,
                ]);
            }
            if (pack.status === interfaces_1.PackageStatus.OutForDelivery) {
                await db.run("UPDATE packages SET status = ? WHERE id = ?", [
                    interfaces_1.PackageStatus.InTransit,
                    pack.id,
                ]);
            }
            if (pack.status === interfaces_1.PackageStatus.ReadyForPickup) {
                await db.run("UPDATE packages SET status = ? WHERE id = ?", [
                    interfaces_1.PackageStatus.Delivered,
                    pack.id,
                ]);
            }
        }
        logger_1.default.info("Package status update job completed successfully.");
    }
    catch (err) {
        logger_1.default.error(err);
    }
};
exports.updatePackageStatusService = updatePackageStatusService;
node_cron_1.default.schedule("*/2 * * * *", async () => {
    logger_1.default.info("Cron job execution started");
    await (0, exports.updatePackageStatusService)();
});
