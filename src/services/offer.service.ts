import { requestHandler } from "@/utils/requestHandler"

export const fetchOffersRequest = async (query: string, pageParam: number) => {
  const url = '/offer' + (query ?? '') + pageParam
  return await requestHandler('get', url)
}

export const fetchOfferAnalyticsRequest = async (query: string) => {
  const url = '/offer/get-offers-count' + (query ?? '')
  return await requestHandler('get', url)
}

export const saveOffersRequest = async (data: unknown) => {
  const url = '/offer';
  return await requestHandler('post', url, data)
}

export const updateOfferStatusRequest = async (data: unknown, id: string) => {
  const url = `/offer/${id}`;
  return await requestHandler('patch', url, data)
}

export const getOfferDetailsRequest = async (data: unknown, id: string) => {
  const url = `/offer/${id}`;
  return await requestHandler('get', url)
}

export const fetchMessagesRequest = async (query: string, pageParam: number, offerId: string) => {
  const url = `/message/${offerId}` + (query ?? '') + pageParam
  return await requestHandler('get', url)
}

export const sendNewMessageRequest = async (data: unknown) => {
  const url = `/message`;
  return await requestHandler('post', url, data)
}

export const updateMessageStatusRequest = async (data: unknown, id: string) => {
  const url = `/message/status/${id}`
  return await requestHandler('patch', url, data)
}

export const getMessageDetailsRequest = async (id: string) => {
  const url = `/message/show/${id}`
  return await requestHandler('get', url)
}