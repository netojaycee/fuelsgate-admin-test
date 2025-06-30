import http from "@/lib/http";

export const requestHandler = async (
  method,
  url,
  formData) => {
  try {
    const response = await http[method.toLowerCase()](url, formData)
    return response?.data;
  } catch (error) {
    throw error?.response?.data;
  }
};