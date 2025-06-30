import { useQuery } from "@tanstack/react-query";
import {
  fetchAuditLogsRequest,
  fetchAuditLogByIdRequest,
} from "@/services/audit-logs.service";

const useAuditLogsHook = () => {
  const useFetchAuditLogs = (queryParams: string = "") =>
    useQuery({
      queryFn: async () => {
        return await fetchAuditLogsRequest(queryParams);
      },
      queryKey: ["AUDIT_LOGS", queryParams],
    });

  const useFetchAuditLogById = (logId: string) =>
    useQuery({
      queryFn: async () => {
        return await fetchAuditLogByIdRequest(logId);
      },
      queryKey: ["AUDIT_LOG", logId],
      enabled: !!logId,
    });

  return {
    useFetchAuditLogs,
    useFetchAuditLogById,
  };
};

export default useAuditLogsHook;
