export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Truck {
  id: string;
  truckId: string;
  model: string;
  status: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  availability: boolean;
}

export interface ProductUpload {
  id: string;
  productName: string;
  uploadDate: string;
  status: string;
}

export interface DepotHub {
  id: string;
  name: string;
  location: string;
  capacity: number;
}

export interface Order {
  id: string;
  orderId: string;
  sellerName: string;
  status: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
} 