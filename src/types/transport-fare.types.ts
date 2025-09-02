export interface TransportConfigDto {
  _id?: string;
  key: string;
  value: number;
  description?: string;
  category?: string;
  createdAt?: string;
}

export interface CreateTransportConfigDto {
  key: string;
  value: number;
  description?: string;
  category?: string;
}

export interface UpdateTransportConfigDto {
  value: number;
  description?: string;
  category?: string;
}

export interface LoadPointDto {
  _id?: string;
  name: string; // unique identifier
  displayName?: string;
  state?: string;
  lga?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface CreateLoadPointDto {
  name: string;
  displayName?: string;
  state?: string;
  lga?: string;
}

export interface DistanceDto {
  _id?: string;
  state: string;
  lga: string;
  loadPoint: string;
  distanceKM: number;
  source?: string;
}

export interface CalculateFareDto {
  truckCapacity: number;
  truckType: 'tanker' | 'flatbed';
  pickupState: string;
  pickupLGA: string;
  loadPoint: string;
}

export interface CalculateFareResult {
  minFarePerLitre: number;
  maxFarePerLitre: number;
  totalMin: number;
  totalMax: number;
  breakdowns: any;
}

export interface BulkUploadDistanceDto {
  state: string;
  lga: string;
  loadPoint: string;
  distanceKM: number;
}
