import cron from "node-cron";
import { connectDatabase } from "../utils/database";
import logger from "../utils/logger";
import { IServiceResponseDTO, Package, PackageStatus } from "../interfaces";
import { formatResponse } from "../utils/response-format";

export const updatePackageStatusService = async () => {
  try {
    const db = await connectDatabase();
    const packages = await db.all(
      "SELECT * FROM packages WHERE status != ?",
      PackageStatus.Delivered
    );

    for (const pack of packages) {
      if (pack.status === PackageStatus.InTransit) {
        await db.run("UPDATE packages SET status = ? WHERE id = ?", [
          PackageStatus.ReadyForPickup,
          pack.id,
        ]);
      }

      if (pack.status === PackageStatus.Pending) {
        await db.run("UPDATE packages SET status = ? WHERE id = ?", [
          PackageStatus.OutForDelivery,
          pack.id,
        ]);
      }

      if (pack.status === PackageStatus.OutForDelivery) {
        await db.run("UPDATE packages SET status = ? WHERE id = ?", [
          PackageStatus.InTransit,
          pack.id,
        ]);
      }
      if (pack.status === PackageStatus.ReadyForPickup) {
        await db.run("UPDATE packages SET status = ? WHERE id = ?", [
          PackageStatus.Delivered,
          pack.id,
        ]);
      }
    }

    logger.info("Package status update job completed successfully.");
  } catch (err) {
    logger.error(err);
  }
};

cron.schedule("*/2 * * * *", async () => {
    logger.info("Cron job execution started");
  await updatePackageStatusService();
});
