import { DepotHubDto } from "@/types/depot-hub.types";
import { ProductDto } from "@/types/product.types";

export type TruckStatus = "available" | "locked";

export interface TruckDto {
  _id?: string;
  profileId: string;
  availability?: "locked" | "available";
  truckNumber: string;
  capacity: string;
  productId: string | ProductDto;
  depotHubId: string | DepotHubDto;
  depot: string;
  currentState: string;
  currentCity: string;
  status?: TruckStatus;
  truckOrderId?: string;
}
