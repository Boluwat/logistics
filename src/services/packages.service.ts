import logger from "../utils/logger";
import { formatResponse } from "../utils/response-format";
import {
  createShipmentsDTO,
  IServiceResponseDTO,
  IShipments,
  PackageStatus,
  shipmentDTO,
} from "../interfaces";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import { Shipments } from "../models/shipments";
import constants from "../utils/constants";
import { mapShipmentModelToDTO } from "../utils/util";

const generateTrackingNumber = () => {
  const uuid = uuidv4().replace(/-/g, "");
  const tracker = uuid.slice(0, 6).toUpperCase();

  return tracker;
};


const countryRates: Record<string, number> = {
  USA: 15000,
  Canada: 17000,
  UK: 10500
}

export const createShipmentService = async (
  payload: IShipments,
  currentUser: mongoose.Types.ObjectId
): Promise<IServiceResponseDTO<shipmentDTO | undefined>> => {
  try {
    payload.user = currentUser;
    payload.trackingNumber = generateTrackingNumber();

    const receiverCountry = payload.receiver?.address?.country

    const errors = [];

    for (const item of payload.items) {
      if (item.volumeMetric) {
        if (item.length && item.width && item.height) {
          const weight = (item.height * item.length * item.width) / 5000;
          item.weight = Math.round(weight * 10) / 10;
        } else {
          errors.push(constants.errorMessage.missingDimension);
        }
      }
    }

    if (errors.length > 0) {
      return formatResponse({
        isSuccess: false,
        message: errors[0], // Return the first error message or handle multiple errors
      });
    }

    // Calculate rate based on the receiver country and item weight
    if (receiverCountry && receiverCountry in countryRates) {
      const baseRate = countryRates[receiverCountry];
      const totalQuote = payload.items.reduce((accumulatedQuote, item) => {
        if (item.weight) {
          return accumulatedQuote + baseRate * item.weight;
        }
        return accumulatedQuote;
      }, 0);

      // Add the total quote to the payload (you can adjust where you want this value)
      payload.totalPrice = totalQuote;

      const shipments = await Shipments.create(payload);
      return formatResponse({
        isSuccess: true,
        data: mapShipmentModelToDTO(shipments.toObject()),
        message: constants.success,
      });
    } else {
      // Handle case where receiverCountry is not a valid country
      return formatResponse({
        isSuccess: false,
        message: constants.errorMessage.invalidCountry,
      });
    }
  } catch (err) {
    logger.error(err);
    return formatResponse({
      isSuccess: false,
      message: constants.errorMessage.default,
    });
  }
};

export const updateShipmentService = async (
  payload: IShipments,
  id: string,
): Promise<IServiceResponseDTO<shipmentDTO | undefined>> => {
  try {
    const receiverCountry = payload.receiver?.address?.country
    payload.trackingNumber = generateTrackingNumber();
    const errors = [];
    for (const item of payload.items) {
      if (item.volumeMetric) {
        if (item.length && item.width && item.height) {
          const weight = (item.height * item.length * item.width) / 5000;
          item.weight = Math.round(weight * 10) / 10;
        } else {
          errors.push(constants.errorMessage.missingDimension);
        }
      }
    }

    if (errors.length > 0) {
      return formatResponse({
        isSuccess: false,
        message: errors[0], // Return the first error message or handle multiple errors
      });
    }
    if (receiverCountry && receiverCountry in countryRates) {
      const baseRate = countryRates[receiverCountry];
      const totalQuote = payload.items.reduce((accumulatedQuote, item) => {
        if (item.weight) {
          return accumulatedQuote + baseRate * item.weight;
        }
        return accumulatedQuote;
      }, 0);

      // Add the total quote to the payload (you can adjust where you want this value)
      payload.totalPrice = totalQuote;

      const shipment = await Shipments.findOneAndUpdate(
        {
          _id: id,
        },
        payload,
        {
          new: true,
        }
      );
  
      return formatResponse({
        isSuccess: true,
        data: mapShipmentModelToDTO(shipment?.toObject()),
        message: constants.success,
      });
    } else {
      // Handle case where receiverCountry is not a valid country
      return formatResponse({
        isSuccess: false,
        message: constants.errorMessage.invalidCountry,
      });
    }

   
  } catch (err) {
    logger.error(err);
    return formatResponse({
      isSuccess: false,
      message: constants.errorMessage.default,
    });
  }
};

export const trackPackagesService = async (
    trackingId: string
): Promise<IServiceResponseDTO<shipmentDTO | undefined>> => {
  try {
    const shipment = await Shipments.findOne({trackingNumber: trackingId});

    if(!shipment) {
      return formatResponse({
        isSuccess: false,
        message: `Tracking number ${constants.errorMessage.notExist}`,
      })
    }
    return formatResponse({
      isSuccess: true,
      data: mapShipmentModelToDTO(shipment.toObject())
    });
  } catch (error) {
    logger.error(error);
    return formatResponse({
      message: "Something went wrong!",
    });
  }
};

// export const trackPackagesService = async (
//   trackingId: string
// ): Promise<IServiceResponseDTO<shipmentDTO | undefined>> => {
// try {
//   const shipment = await Shipments.findOne({trackingNumber: trackingId});

//   if(!shipment) {
//     return formatResponse({
//       isSuccess: false,
//       message: `Tracking number ${constants.errorMessage.notExist}`,
//     })
//   }
//   return formatResponse({
//     isSuccess: true,
//     data: mapShipmentModelToDTO(shipment.toObject())
//   });
// } catch (error) {
//   logger.error(error);
//   return formatResponse({
//     message: "Something went wrong!",
//   });
// }
// };
