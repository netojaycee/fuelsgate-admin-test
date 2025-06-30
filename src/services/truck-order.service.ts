import { requestHandler } from "@/utils/requestHandler"

export const fetchTruckOrdersRequest = async (query: string, pageParam: number) => {
  const url = '/truck-order' + (query ?? '') + pageParam
  return await requestHandler('get', url)
}

export const fetchTruckOrderAnalyticsRequest = async (query: string) => {
  const url = '/truck-order/get-truck-orders-count' + (query ?? '')
  return await requestHandler('get', url)
}

export const saveTruckOrdersRequest = async (data: unknown) => {
  const url = '/truck-order';
  return await requestHandler('post', url, data)
}

export const updateTruckOrderStatusRequest = async (data: unknown, id: string) => {
  const url = `/truck-order/status/${id}`;
  return await requestHandler('patch', url, data)
}

export const updateTruckOrderRFQStatusRequest = async (data: unknown, id: string) => {
  const url = `/truck-order/status/rfq/${id}`;
  return await requestHandler('patch', url, data)
}

export const updateTruckOrderPriceRequest = async (data: unknown, id: string) => {
  const url = `/truck-order/price/${id}`;
  return await requestHandler('patch', url, data)
}

export const getTruckOrderDetailsRequest = async (id: string) => {
  const url = `/truck-order/${id}`;
  return await requestHandler('get', url)
}
