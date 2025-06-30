import { OfferDto } from "./offer.types";
import { UserType } from "./user.types";

export type MessageStatus = 'pending' | 'accepted' | 'rejected';

export interface MessageDto {
  _id?: string
  offerId?: string
  actionBy?: string | UserType
  userId?: string | UserType
  status: MessageStatus
  offer: number
  createdAt?: string
  updatedAt?: string
}
