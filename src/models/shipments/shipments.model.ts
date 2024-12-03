import mongoose, { Model, Schema, model } from "mongoose";
import { IShipments, PackageStatus } from "../../interfaces";
import { validateUser } from "../users";

const shipmentSchema = new Schema<IShipments>(
  {
    sender: {
      fullname: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      address: {
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        street: {
          type: String,
        },
        postCode: {
          type: String,
        },
        apartmentName: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    },
    receiver: {
      fullname: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      address: {
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        street: {
          type: String,
        },
        postCode: {
          type: String,
        },
        apartmentName: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    },
    status: {
      type: String,
      default: PackageStatus.Pending,
      enum: [
        PackageStatus.Pending,
        PackageStatus.Delivered,
        PackageStatus.InTransit,
        PackageStatus.OutForDelivery,
        PackageStatus.ReadyForPickup,
      ],
    },
    items: [
      {
        descriptions: {
          type: String,
        },
        weight: {
          type: Number,
        },
        length: {
          type: Number,
        },
        height: {
          type: Number,
        },
        width: {
          type: Number,
        },
        value: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
        category: {
          type: String,
        },
        volumeMetric: {
          type: Boolean,
          default: false,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      validate: validateUser,
      index: true,
      required: true,
    },
    trackingNumber: {
      type: String,
    },
    totalPrice: {
      type: Number,
      default: 0,
    }
  },
  {
    strict: "throw",
    timestamps: true,
  }
);

interface IShipmentsModel extends Model<IShipments> {}
const Shipments = model<IShipments, IShipmentsModel>("Shipments", shipmentSchema);

export default Shipments;
