import { DepotHubDto } from "@/types/depot-hub.types";
import { UserType } from "@/types/user.types";

export type SellerValues = 'depot-owner' | 'trader';

export type SellerDto = {
  _id?: string;
  userId?: string | UserType;
  category: SellerValues;
  profilePicture?: string;
  businessName: string;
  depotName?: string;
  products: string[];
  phoneNumber: string;
  depotAddress?: string
  officeAddress?: string;
  depotHub: string;
}

export type BuyerValues = 'reseller' | 'basic-customer';

export type BuyerDto = {
  _id?: string;
  category: BuyerValues;
  userId?: string | UserType;
}

export type TransporterDto = {
  _id?: string;
  userId?: string | UserType;
  companyName: string;
  companyAddress: string;
  profilePicture?: string;
  companyEmail?: string;
  phoneNumber: string;
  state: string | DepotHubDto;
}