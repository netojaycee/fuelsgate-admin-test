import { DepotHubDto } from "@/types/depot-hub.types";
import { ProductDto } from "@/types/product.types";

export type TruckStatus = "available" | "locked" | "pending";

export interface TruckDto {
  _id?: string;
  profileId: any;
  truckNumber: string;
  capacity: number;
  productId: string | ProductDto;
  depotHubId: string | DepotHubDto;
  depot: string;
  currentState: string;
  currentCity: string;
  status: TruckStatus;
  loadStatus: "loaded" | "unloaded";
  truckOrderId?: string;
  createdAt?: string;
  updatedAt?: string;
  ownerId?: string; // ID of the owner, if applicable
  truckOwner?: string; // Name of the truck owner, if different from profileId.companyName
  ownerLogo?: string; // URL or path to the owner's logo
  profileType?: string; // Optional field to indicate the type of profile (e.g., "owner", "driver")
}

export interface CreateTruckDto {
  truckNumber: string;
  capacity: number;
  productId: string;
  depotHubId: string;
  depot: string;
  ownerId?: string; // Optional - only required for admin-created trucks
  truckOwner?: string; // Optional - only required for admin-created trucks
  ownerLogo?: string;
  profileType?: string; // For edit mode
  profileId?: string; // For edit mode
  loadStatus: "loaded" | "unloaded"; 
  
  // currentState: string;
  // currentCity: string;
}

export interface UpdateTruckDto extends Partial<CreateTruckDto> { }
