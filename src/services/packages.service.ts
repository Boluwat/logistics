import logger from "../utils/logger";
import { formatResponse } from "../utils/response-format";
import { connectDatabase } from "../utils/database";
import { IServiceResponseDTO, Package, PackageStatus } from "../interfaces";
import {v4 as uuidv4} from 'uuid'

export const createPackageService = async (
  payload: Partial<Package>,
  currentUser: { id: number }
): Promise<IServiceResponseDTO<Package | undefined>> => {
  try {
    const db = await connectDatabase();
    const newPackage = {
      ...payload,
      status: PackageStatus.Pending,
      userId: currentUser.id,
      trackingId: uuidv4()
    };

    const packages = await db.run(
      "INSERT INTO packages (name, status, pickUpDate, userId, trackingId) VALUES (?, ?, ?, ?, ?)",
      [
        newPackage.name,
        newPackage.status,
        newPackage.pickUpDate,
        newPackage.userId,
        newPackage.trackingId,
      ]
    );

    const response = packages.lastID;
    const newPackages = await db.get(
      "SELECT * FROM packages WHERE id = ?",
      response
    );
    return formatResponse({
      isSuccess: true,
      data: newPackages,
      message: "Success",
    });
  } catch (err) {
    logger.error(err);
    return formatResponse({
      isSuccess: false,
      message: "You just hit a break wall",
    });
  }
};

export const updatePackageService = async (
  payload: Partial<Package>,
  id: number
): Promise<IServiceResponseDTO<Package | undefined>> => {
  try {
    const db = await connectDatabase();
    const packageToUpdate = await db.get(
      "SELECT * FROM packages WHERE id = ?",
      id
    );

    if (!packageToUpdate) {
      return formatResponse({
        isSuccess: false,
        message: "Package records not found",
      });
    }

    const updatedPackage = { ...packageToUpdate, ...payload };
    await db.run(
      "UPDATE packages SET name = ?, pickUpDate = ? WHERE id = ?",
      [
        updatedPackage.name,
        updatedPackage.pickUpDate,
        id,
      ]
    );

    const newPackage = await db.get("SELECT * FROM packages WHERE id = ?", id);

    return formatResponse({
      isSuccess: true,
      data: newPackage,
      message: "Package updated successfully",
    });
  } catch (err) {
    logger.error(err);
    return formatResponse({
      isSuccess: false,
      message: "Something went wrong",
    });
  }
};

export const trackPackagesService = async (
    trackingId: string
): Promise<IServiceResponseDTO<Package[] | undefined>> => {
  try {
    const db = await connectDatabase();

    const packages = await db.all("SELECT * FROM packages WHERE trackingId = ?", trackingId)

    return formatResponse({
      isSuccess: true,
      data: packages
    });
  } catch (error) {
    logger.error(error);
    return formatResponse({
      message: "Something went wrong!",
    });
  }
};


