import { ProductUploadDto } from "@/types/product-upload.types"
import { requestHandler } from "@/utils/requestHandler"

export const fetchProductUploadsRequest = async (query: string, pageParam: number) => {
  const url = '/product-upload' + (query ?? '') + pageParam
  return await requestHandler('get', url)
}

export const getProductUploadRequest = async (productUploadId: string) => {
  const url = '/product-upload/' + productUploadId
  return await requestHandler('get', url)
}

export const saveProductUploadsRequest = async (data: Omit<ProductUploadDto, '_id' | 'sellerId' | 'status'>) => {
  const url = '/product-upload';
  const currentTime = new Date();
  const expiresInMs = data.expiresIn * 60 * 60 * 1000;
  const newTime = new Date(currentTime.getTime() + expiresInMs);

  const updatedData = {
    ...data,
    expiresIn: newTime.toISOString(),
  };

  return await requestHandler('post', url, updatedData)
}

export const updateProductUploadsRequest = async (data: Omit<ProductUploadDto, '_id' | 'sellerId' | 'status'>, id: string) => {
  const url = `/product-upload/${id}`;
  const currentTime = new Date();
  const expiresInMs = data.expiresIn * 60 * 60 * 1000;
  const newTime = new Date(currentTime.getTime() + expiresInMs);

  const updatedData = {
    ...data,
    expiresIn: newTime.toISOString(),
  };

  return await requestHandler('put', url, updatedData)
}