import { requestHandler } from "@/utils/requestHandler"

export const fetchTruckOrdersRequest = async (query: string, pageParam: number) => {
  const url = '/order' + (query ?? '') + pageParam
  return await requestHandler('get', url)
}

export const fetchTruckOrderAnalyticsRequest = async (query: string) => {
  const url = '/order/get-orders-count' + (query ?? '')
  return await requestHandler('get', url)
}

export const saveTruckOrdersRequest = async (data: unknown) => {
  const url = '/order';
  return await requestHandler('post', url, data)
}

export const updateTruckOrderStatusRequest = async (data: unknown, id: string) => {
  const url = `/order/status/${id}`;
  return await requestHandler('patch', url, data)
}

export const updateTruckOrderRFQStatusRequest = async (data: unknown, id: string) => {
  const url = `/order/status/rfq/${id}`;
  return await requestHandler('patch', url, data)
}

export const updateTruckOrderPriceRequest = async (data: unknown, id: string) => {
  const url = `/order/price/${id}`;
  return await requestHandler('patch', url, data)
}

export const getTruckOrderDetailsRequest = async (id: string) => {
  const url = `/order/${id}`;
  return await requestHandler('get', url)
}

export const deleteTruckOrderRequest = async (orderId: string) => {
  const url = `/order/${orderId}`;
  return await requestHandler('delete', url);
};

export const fetchTruckOrdersAdmin = async (queryParams: string) => {
  const url = `/order/admin/all${queryParams}`;
  return await requestHandler('get', url);
};