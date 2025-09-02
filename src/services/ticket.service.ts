import { requestHandler } from "@/utils/requestHandler"



export const getTicketDetailsRequest = async (id: string) => {
  const url = `/ticket/order/${id}`;
  return await requestHandler('get', url)
}