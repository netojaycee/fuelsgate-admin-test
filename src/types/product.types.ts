export type ProductStatus = 'active' | 'inactive';

export interface ProductDto {
  _id: string
  name: string
  value: string
  color: string
  status: ProductStatus
}