import { BuyerDto, SellerDto } from "./onboarding.types";
import { ProductUploadDto } from "./product-upload.types";

export type OrderStatus =
  | "awaiting-approval"
  | "in-progress"
  | "completed"
  | "cancelled";

export interface OrderDto {
  _id?: string;
  sellerId?: SellerDto | string;
  buyerId?: BuyerDto | string;
  productUploadId?: ProductUploadDto | string;
  price: number;
  trackingId: string;
  status: OrderStatus;
  volume: number;
  createdAt?: Date;
  expiresIn?: string;
}

export type OrderFormDto = Pick<
  OrderDto,
  "sellerId" | "productUploadId" | "price" | "volume"
>;
