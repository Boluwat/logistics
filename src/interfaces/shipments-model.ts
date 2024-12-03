import mongoose, { Document } from "mongoose";
import { User } from "../models/users";

export enum PackageStatus {
  Delivered = "delivered",
  InTransit = "in transit",
  OutForDelivery = "out for delivery",
  ReadyForPickup = "picked up",
  Pending = "pending",
}

export interface ICustomerDetailsDTO {
  fullname: string;
  address?: ICustomerAddressDTO;
  email: string;
  phone: string;
}

export interface ICustomerAddressDTO {
  state?: string;
  country?: string;
  street?: string;
  postCode?: string;
  apartmentName?: string;
  description?: string;
}

export interface IPackageDTO {
  descriptions: string;
  weight?: number;
  length?: number;
  height?: number;
  width?: number;
  value: number;
  quantity: number;
  category: string;
  volumeMetric: boolean;
}

export interface IShipments extends Document {
  sender: ICustomerDetailsDTO;
  receiver: ICustomerDetailsDTO;
  user: mongoose.Types.ObjectId;
  status?: PackageStatus;
  items: IPackageDTO[];
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  totalPrice?: number;
}


export interface createShipmentsDTO {
  sender: ICustomerDetailsDTO;
  receiver: ICustomerDetailsDTO;
  user: mongoose.Schema.Types.ObjectId;
  items: IPackageDTO[];
}

export interface shipmentDTO{
  sender: ICustomerDetailsDTO;
  receiver: ICustomerDetailsDTO;
  user: mongoose.Types.ObjectId;
  status?: PackageStatus;
  items: IPackageDTO[];
  createdAt: Date;
  updatedAt: Date;
  id: string;
  trackingNumber?: string;
  totalPrice?: number;
}
