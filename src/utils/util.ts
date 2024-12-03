import { IUserDTO, shipmentDTO } from "../interfaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapUserStoreModelToDTO = (user: any): IUserDTO => ({
  id: user._id.toString(),
  firstname: user.firstname,
  lastname: user.lastname,
  email: user.email,
  phone: user.mobile,
  createdAt: user?.createdAt,
  updatedAt: user?.updatedAt,
  isActivated: user.isActivated,
});

export const mapShipmentModelToDTO = (shipment: any): shipmentDTO => ({
  id: shipment._id.toString(),
 ...shipment
});