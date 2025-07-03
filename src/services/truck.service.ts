import { requestHandler } from "@/utils/requestHandler";
import { CreateTruckDto, UpdateTruckDto } from "@/types/truck.type";

export const fetchTrucksRequest = async (query: string) => {
    const url = "/truck" + (query ?? "");
    return await requestHandler("get", url);
};

export const fetchTruckByIdRequest = async (truckId: string) => {
    const url = `/truck/${truckId}`;
    return await requestHandler("get", url);
};

export const createTruckRequest = async (truckData: CreateTruckDto) => {
    const url = "/truck";
    return await requestHandler("post", url, truckData);
};

export const updateTruckRequest = async (truckId: string, truckData: UpdateTruckDto) => {
    const url = `/truck/${truckId}`;
    return await requestHandler("put", url, truckData);
};

export const updateTruckStatusRequest = async (truckId: string, status: string) => {
    const url = `/truck/${truckId}/status`;
    return await requestHandler("patch", url, { status });
};

export const deleteTruckRequest = async (truckId: string) => {
    const url = `/truck/${truckId}`;
    return await requestHandler("delete", url);
};
