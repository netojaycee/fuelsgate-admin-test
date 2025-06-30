import { requestHandler } from "@/utils/requestHandler"

export const fetchBuyerAnalyticsRequest = async () => {
  const url = '/buyer/analytics'
  return await requestHandler('get', url)
}