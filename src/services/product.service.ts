import { requestHandler } from "@/utils/requestHandler"
import { CreateProductDto, UpdateProductDto } from "@/types/product.types"

export const fetchProductsRequest = async (query: string) => {
  const url = '/product' + (query ?? '')
  return await requestHandler('get', url)
}

export const fetchProductByIdRequest = async (productId: string) => {
  const url = `/product/${productId}`
  return await requestHandler('get', url)
}

export const createProductRequest = async (productData: CreateProductDto) => {
  const url = '/product'
  return await requestHandler('post', url, productData)
}

export const updateProductRequest = async (productId: string, productData: UpdateProductDto) => {
  const url = `/product/${productId}`
  return await requestHandler('put', url, productData)
}

export const deleteProductRequest = async (productId: string) => {
  const url = `/product/${productId}`
  return await requestHandler('delete', url)
}