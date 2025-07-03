import { DepotHubDto } from "@/types/depot-hub.types";
import { ProductDto } from "@/types/product.types";

export type TruckStatus = "available" | "locked" | "pending";

export interface TruckDto {
  _id?: string;
  profileId: string;
  truckNumber: string;
  capacity: number;
  productId: string | ProductDto;
  depotHubId: string | DepotHubDto;
  depot: string;
  currentState: string;
  currentCity: string;
  status: TruckStatus;
  truckOrderId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTruckDto {
  truckNumber: string;
  capacity: number;
  productId: string;
  depotHubId: string;
  depot: string;
  currentState: string;
  currentCity: string;
}

export interface UpdateTruckDto extends Partial<CreateTruckDto> { }
