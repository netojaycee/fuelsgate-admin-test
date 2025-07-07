export interface PlatformConfigDto {
    _id?: string;
    key: string;
    value: number;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreatePlatformConfigDto {
    key: string;
    value: number;
    description?: string;
}

export interface UpdatePlatformConfigDto {
    value: number;
    description?: string;
}

export interface ServiceFeeConfig {
    transporterServiceFee: number;
    traderServiceFee: number;
}

export interface PlatformConfigQueryParams {
    page?: number;
    limit?: number;
    key?: string;
}
