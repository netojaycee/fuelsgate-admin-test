import { requestHandler } from "@/utils/requestHandler"

export const fetchOrdersRequest = async (query: string, pageParam: number) => {
  const url = '/order' + (query ?? '') + pageParam
  return await requestHandler('get', url)
}

export const fetchOrderAnalyticsRequest = async (query: string) => {
  const url = '/order/get-orders-count' + (query ?? '')
  return await requestHandler('get', url)
}

export const saveOrdersRequest = async (data: unknown) => {
  const url = '/order';
  return await requestHandler('post', url, data)
}

export const updateOrderStatusRequest = async (data: unknown, id: string) => {
  const url = `/order/status/${id}`;
  return await requestHandler('patch', url, data)
}

export const updateOrderPriceRequest = async (data: unknown, id: string) => {
  const url = `/order/price/${id}`;
  return await requestHandler('patch', url, data)
}

export const getOrderDetailsRequest = async (id: string) => {
  const url = `/order/${id}`;
  return await requestHandler('get', url)
}
