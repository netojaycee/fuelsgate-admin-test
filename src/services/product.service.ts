import { requestHandler } from "@/utils/requestHandler"

export const fetchProductsRequest = async (query: string) => {
  const url = '/product' + (query ?? '')
  return await requestHandler('get', url)
}