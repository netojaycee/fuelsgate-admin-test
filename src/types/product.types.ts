export type ProductStatus = 'active' | 'inactive';

export interface ProductDto {
  _id: string
  name: string
  value: string
  color: string
  unit: string
  status: ProductStatus
}

export interface CreateProductDto {
  name: string
  value: string
  color: string
  unit: string
  status: ProductStatus
}

export interface UpdateProductDto extends Partial<CreateProductDto> { }