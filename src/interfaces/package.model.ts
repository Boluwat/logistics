
export enum PackageStatus {
    Delivered = 'delivered',
    InTransit = 'in transit',
    OutForDelivery = 'out for delivery',
    ReadyForPickup = 'picked up',
    Pending = 'pending'
  }

export interface Package {
    id: number;
    name: string;
    userId: number;
    status?: PackageStatus;
    pickUpDate?: Date;
    trackingId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}