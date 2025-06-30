import { requestHandler } from "@/utils/requestHandler";

export const fetchAuditLogsRequest = async (query: string = '') => {
    const url = `/audit-logs${query ? `?${query}` : ''}`;
    return await requestHandler('get', url);
};

export const fetchAuditLogByIdRequest = async (logId: string) => {
    const url = `/audit-logs/${logId}`;
    return await requestHandler('get', url);
};
