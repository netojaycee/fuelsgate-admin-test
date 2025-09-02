import { requestHandler } from '@/utils/requestHandler';
import {
  CreateTransportConfigDto,
  CreateLoadPointDto,
  LoadPointDto,
  DistanceDto,
  CalculateFareDto,
  BulkUploadDistanceDto,
} from '@/types/transport-fare.types';

export const getTransportConfigsRequest = async (params: any = {}) => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.key) queryParams.append('key', params.key);
  const qs = queryParams.toString() ? `?${queryParams.toString()}` : '';
  return await requestHandler('get', `/transport-fare/admin/config${qs}`);
};

export const createTransportConfigRequest = async (data: CreateTransportConfigDto) => {
  return await requestHandler('post', `/transport-fare/admin/config`, data);
};

export const updateTransportConfigRequest = async (key: string, data: any) => {
  return await requestHandler('put', `/transport-fare/admin/config/${key}`, data);
};

export const deleteTransportConfigRequest = async (key: string) => {
  return await requestHandler('delete', `/transport-fare/admin/config/${key}`);
};

export const getLoadPointsRequest = async () => {
  return await requestHandler('get', `/transport-fare/load-points`);
};

export const createLoadPointRequest = async (data: CreateLoadPointDto) => {
  return await requestHandler('post', `/transport-fare/admin/load-points`, data);
};

export const getDistancesRequest = async (params: any = {}) => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.key) queryParams.append('key', params.key);
  const qs = queryParams.toString() ? `?${queryParams.toString()}` : '';
  return await requestHandler('get', `/transport-fare/admin/distances${qs}`);
};

export const bulkUploadDistancesRequest = async (rows: BulkUploadDistanceDto[]) => {
  return await requestHandler('post', `/transport-fare/admin/distances/bulk-upload`, rows);
};

export const calculateFareRequest = async (payload: CalculateFareDto) => {
  return await requestHandler('post', `/transport-fare/calculate`, payload);
};
