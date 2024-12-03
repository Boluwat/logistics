import mongoose, {  Model } from 'mongoose';
import { IShipments } from "../../interfaces";

type ShipmentsModel = Model<IShipments>;

const validateShipment = async function (val: string): Promise<boolean> {
  const Shipments: ShipmentsModel = mongoose.model<IShipments>('Shipments');
  try {
    const shipments: IShipments | null = await Shipments.findById(val);
    return Boolean(shipments);
  } catch (ex) {
    return false;
  }
}

export default validateShipment;