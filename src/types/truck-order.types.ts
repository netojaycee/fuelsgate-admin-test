import { BuyerDto, SellerDto, TransporterDto } from "./onboarding.types";
import { TruckDto } from "./truck.type";

export type TruckOrderStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "cancelled";

export interface TruckOrderDto {
  _id?: string;
  truckId: string | TruckDto;
  profileId?: string | SellerDto | TransporterDto;
  profileType: string;
  buyerId?: string | BuyerDto;
  orderId?: string;
  price: number;
  status: TruckOrderStatus;
  rfqStatus: TruckOrderRFQStatus;
  trackingId: string;
  destination: string;
  state: string;
  loadingDate?: Date;
  arrivalTime?: Date;
  city: string;
  loadingDepot: string;
  // loadingState: string;
  // loadingCity: string;
  // loadingAddress: string;
  createdAt?: Date | string;
}
export type TruckOrderRFQStatus = "pending" | "sent" | "accepted" | "rejected";

export type TruckOrderFormDto = Pick<
  TruckOrderDto,
  "orderId" | "state" | "city" | "destination" | "loadingDate" | "loadingDepot"
  // | 'loadingState'
  // | 'loadingCity'
  // | 'loadingAddress'
> & { truckId: string };
