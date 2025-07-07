import { requestHandler } from '@/utils/requestHandler';
import { CreatePlatformConfigDto, PlatformConfigDto, PlatformConfigQueryParams, ServiceFeeConfig, UpdatePlatformConfigDto } from '@/types/platform-config.types';

export const getPlatformConfigsRequest = async (params: PlatformConfigQueryParams = {}) => {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.key) queryParams.append('key', params.key);

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const url = `/platform-config${queryString}`;

    return await requestHandler('get', url);
};

export const getPlatformConfigRequest = async (key: string) => {
    const url = `/platform-config/${key}`;
    return await requestHandler('get', url);
};

export const createPlatformConfigRequest = async (data: CreatePlatformConfigDto) => {
    const url = '/platform-config';
    return await requestHandler('post', url, data);
};

export const updatePlatformConfigRequest = async (key: string, data: UpdatePlatformConfigDto) => {
    const url = `/platform-config/${key}`;
    return await requestHandler('put', url, data);
};

export const deletePlatformConfigRequest = async (key: string) => {
    const url = `/platform-config/${key}`;
    return await requestHandler('delete', url);
};

export const getServiceFeesRequest = async () => {
    const url = '/platform-config/service/fees';
    return await requestHandler('get', url);
};

export const updateServiceFeesRequest = async (data: ServiceFeeConfig) => {
    const url = '/platform-config/service/fees';
    return await requestHandler('put', url, data);
};
