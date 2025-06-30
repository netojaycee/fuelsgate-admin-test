import { MessageDto } from "./message.type";
import { ProductUploadDto } from "./product-upload.types";
import { UserType } from "./user.types";

export type OfferStatus = 'ongoing' | 'completed' | 'cancelled';

export interface OfferDto {
  _id?: string
  senderId?: string | UserType
  receiverId: string | UserType
  orderId?: string
  senderDetails?: UserType
  receiverDetails?: UserType
  productUploadId: string | ProductUploadDto
  status?: OfferStatus
  volume?: number
  lastMessage?: MessageDto
}

export type SendMessageDto = {
  offerId: string;
  offer: number
}

export type OfferFormDto = { offer: number, receiverId: string, productUploadId: string, volume: number }