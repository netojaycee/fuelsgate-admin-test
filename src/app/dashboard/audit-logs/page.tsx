"use client";

import React, { useState, useMemo } from "react";
import CustomInput from "@/components/atoms/custom-input";
import { CustomSelect } from "@/components/atoms/custom-select";
import { Text } from "@/components/atoms/text";
import CustomPagination from "@/components/molecules/CustomPagination";
import { CustomTable } from "@/components/organism/custom-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  FilterIcon,
  Eye,
  Activity,
  User,
  Clock,
  Monitor,
  Globe,
  Server,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Search,
} from "lucide-react";
import useAuditLogsHook from "@/hooks/useAuditLogs.hook";
import { formatDate, formatDateTime } from "@/utils/formatDate";
import { AuditLog } from "@/types/audit-logs.types";

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState<string[]>([]);
  const [selectedAction, setSelectedAction] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { useFetchAuditLogs } = useAuditLogsHook();

  // Build query parameters
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();

    if (searchTerm) params.append("search", searchTerm);
    if (selectedModule.length > 0)
      params.append("module", selectedModule.join(","));
    if (selectedAction.length > 0)
      params.append("action", selectedAction.join(","));
    if (selectedStatus.length > 0)
      params.append("status", selectedStatus.join(","));
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    params.append("page", currentPage.toString());
    params.append("limit", "20");
    params.append("sortBy", "createdAt");
    params.append("sortOrder", "desc");

    return params.toString();
  }, [
    searchTerm,
    selectedModule,
    selectedAction,
    selectedStatus,
    startDate,
    endDate,
    currentPage,
  ]);

  const { data: logsData, isLoading } = useFetchAuditLogs(queryParams);
  const logs = logsData?.data?.logs || [];
  const totalPages = logsData?.data?.totalPages || 1;
  const hasNext = logsData?.data?.hasNext || false;
  const hasPrev = logsData?.data?.hasPrev || false;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      SUCCESS: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      ERROR: { color: "bg-red-100 text-red-800", icon: XCircle },
      FAILED: { color: "bg-red-100 text-red-800", icon: XCircle },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.SUCCESS;
    const IconComponent = config.icon;

    return (
      <Badge className={`${config.color} border-none flex items-center gap-1`}>
        <IconComponent className='w-3 h-3' />
        {status}
      </Badge>
    );
  };

  const getActionBadge = (action: string) => {
    const actionConfig = {
      CREATE: { color: "bg-blue-100 text-blue-800" },
      READ: { color: "bg-gray-100 text-gray-800" },
      UPDATE: { color: "bg-yellow-100 text-yellow-800" },
      DELETE: { color: "bg-red-100 text-red-800" },
    };

    const config =
      actionConfig[action as keyof typeof actionConfig] || actionConfig.READ;

    return <Badge className={`${config.color} border-none`}>{action}</Badge>;
  };

  const getMethodBadge = (method: string) => {
    const methodConfig = {
      GET: { color: "bg-green-100 text-green-800" },
      POST: { color: "bg-blue-100 text-blue-800" },
      PUT: { color: "bg-yellow-100 text-yellow-800" },
      PATCH: { color: "bg-orange-100 text-orange-800" },
      DELETE: { color: "bg-red-100 text-red-800" },
    };

    const config =
      methodConfig[method as keyof typeof methodConfig] || methodConfig.GET;

    return (
      <Badge className={`${config.color} border-none font-mono text-xs`}>
        {method}
      </Badge>
    );
  };

  const getUserName = (log: AuditLog) => {
    if (typeof log.userId === "object" && log.userId !== null) {
      return `${log.userId.firstName} ${log.userId.lastName}`;
    }
    return log.userName || log.userEmail;
  };

  const columns = [
    {
      header: "User",
      accessorKey: "userId",
      cell: ({ row }: { row: any }) => {
        const log = row.original;
        return (
          <div className='flex flex-col'>
            <Text variant='ps' classNames='text-black font-medium'>
              {getUserName(log)}
            </Text>
            <Text variant='ps' classNames='text-gray-500 text-xs'>
              {log.userEmail}
            </Text>
          </div>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: { row: any }) => getActionBadge(row.original.action),
    },
    {
      header: "Module",
      accessorKey: "module",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-black font-medium'>
          {row.original.module}
        </Text>
      ),
    },
    {
      header: "Method",
      accessorKey: "method",
      cell: ({ row }: { row: any }) => getMethodBadge(row.original.method),
    },
    {
      header: "Endpoint",
      accessorKey: "endpoint",
      cell: ({ row }: { row: any }) => (
        <Text
          variant='ps'
          classNames='text-gray-600 font-mono text-xs truncate max-w-[200px]'
        >
          {row.original.endpoint}
        </Text>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: any }) => getStatusBadge(row.original.status),
    },
    {
      header: "Time",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any }) => (
        <div className='flex flex-col'>
          <Text variant='ps' classNames='text-black text-xs'>
            {formatDate(row.original.createdAt)}
          </Text>
          <Text variant='ps' classNames='text-gray-500 text-xs'>
            {row.original.executionTime}ms
          </Text>
        </div>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: { row: any }) => (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size='sm'
              variant='outline'
              onClick={() => setSelectedLog(row.original)}
            >
              <Eye className='w-4 h-4 mr-1' />
              View
            </Button>
          </SheetTrigger>
          <SheetContent className='w-[600px] sm:w-[700px] overflow-y-auto'>
            <SheetHeader>
              <SheetTitle className='flex items-center gap-2'>
                <Activity className='w-5 h-5' />
                Audit Log Details
              </SheetTitle>
              <SheetDescription>
                Detailed information about this system activity
              </SheetDescription>
            </SheetHeader>
            {selectedLog && <LogDetailsContent log={selectedLog} />}
          </SheetContent>
        </Sheet>
      ),
    },
  ];

  const handleNextPage = () => {
    if (hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPrev) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const emptyStateMessage = {
    title: "No Audit Logs Found",
    message: "There are no system activities to display at the moment.",
  };

  const moduleOptions = [
    { label: "API", value: "API" },
    { label: "Auth", value: "AUTH" },
    { label: "User", value: "USER" },
    { label: "Product", value: "PRODUCT" },
    { label: "Order", value: "ORDER" },
    { label: "Truck", value: "TRUCK" },
    { label: "Depot", value: "DEPOT" },
  ];

  const actionOptions = [
    { label: "Create", value: "CREATE" },
    { label: "Read", value: "READ" },
    { label: "Update", value: "UPDATE" },
    { label: "Delete", value: "DELETE" },
  ];

  const statusOptions = [
    { label: "Success", value: "SUCCESS" },
    { label: "Error", value: "ERROR" },
    { label: "Failed", value: "FAILED" },
  ];

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold flex items-center gap-2'>
            <Activity className='w-8 h-8 text-blue-600' />
            Audit Logs
          </h1>
          <Text variant='pm' classNames='text-gray-500 mt-1'>
            Monitor and track all system activities and user actions
          </Text>
        </div>
      </div>

      {/* Filters */}
      <Card className='mb-6'>
        <CardHeader>
          <CardTitle className='text-lg flex items-center gap-2'>
            <Search className='w-5 h-5' />
            Filters & Search
          </CardTitle>
          <CardDescription>
            Filter logs by user actions, modules, status, and date range
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <CustomInput
              placeholder='Search logs...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full h-10'
              name='search'
            />

            {/* <CustomSelect
              name='module'
              options={moduleOptions}
              value={
                selectedModule
                  .map((module) =>
                    moduleOptions.find((opt) => opt.value === module)
                  )
                  .filter(Boolean) as any
              }
              onChange={(selected: any) => {
                if (Array.isArray(selected)) {
                  setSelectedModule(selected.map((item: any) => item.value));
                } else {
                  setSelectedModule(selected ? [selected.value] : []);
                }
              }}
              height='40px'
              classNames='w-full'
              multiple
              {...{
                placeholder: "Select modules",
              }}
            /> */}

            {/* <CustomSelect
              name='action'
              options={actionOptions}
              value={
                selectedAction
                  .map((action) =>
                    actionOptions.find((opt) => opt.value === action)
                  )
                  .filter(Boolean) as any
              }
              onChange={(selected: any) => {
                if (Array.isArray(selected)) {
                  setSelectedAction(selected.map((item: any) => item.value));
                } else {
                  setSelectedAction(selected ? [selected.value] : []);
                }
              }}
              height='40px'
              classNames='w-full'
              multiple
              {...{
                placeholder: "Select actions",
              }}
            /> */}
          </div>
{/* 
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <CustomSelect
              name='status'
              options={statusOptions}
              value={
                selectedStatus
                  .map((status) =>
                    statusOptions.find((opt) => opt.value === status)
                  )
                  .filter(Boolean) as any
              }
              onChange={(selected: any) => {
                if (Array.isArray(selected)) {
                  setSelectedStatus(selected.map((item: any) => item.value));
                } else {
                  setSelectedStatus(selected ? [selected.value] : []);
                }
              }}
              height='40px'
              classNames='w-full'
              multiple
              {...{
                placeholder: "Select status",
              }}
            />

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Start Date
              </label>
              <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className='w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                End Date
              </label>
              <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className='w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div> */}
        </CardContent>
      </Card>

      {/* Logs Table */}
      <div className='bg-white rounded-lg border'>
        <CustomTable
          columns={columns}
          data={logs}
          loading={isLoading}
          emptyState={emptyStateMessage}
        />
      </div>

      {/* Pagination with Page Info */}
      <div className='flex items-center justify-between mt-4'>
        <div className='flex items-center gap-4'>
          <Text variant='ps' classNames='text-gray-500'>
            Page {currentPage} of {totalPages}
          </Text>
          <Text variant='ps' classNames='text-gray-500'>
            Total: {logsData?.data?.total || 0} logs
          </Text>
        </div>
        <CustomPagination
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </div>
    </div>
  );
};

// Log Details Component
const LogDetailsContent = ({ log }: { log: AuditLog }) => {
  return (
    <div className='space-y-6 mt-6'>
      {/* Basic Info */}
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <Text variant='ps' classNames='text-gray-500 font-medium'>
            User
          </Text>
          <div className='mt-1'>
            <Text variant='pm' classNames='text-black font-medium'>
              {typeof log.userId === "object" && log.userId !== null
                ? `${log.userId.firstName} ${log.userId.lastName}`
                : log.userName}
            </Text>
            <Text variant='ps' classNames='text-gray-500'>
              {log.userEmail}
            </Text>
          </div>
        </div>
        <div>
          <Text variant='ps' classNames='text-gray-500 font-medium'>
            Timestamp
          </Text>
          <Text variant='pm' classNames='text-black mt-1'>
            {formatDateTime(log.createdAt)}
          </Text>
        </div>
      </div>

      {/* Action Info */}
      <div className='grid grid-cols-3 gap-4'>
        <div>
          <Text variant='ps' classNames='text-gray-500 font-medium'>
            Action
          </Text>
          <div className='mt-1'>
            <Badge
              className={`${
                log.action === "CREATE"
                  ? "bg-blue-100 text-blue-800"
                  : log.action === "READ"
                  ? "bg-gray-100 text-gray-800"
                  : log.action === "UPDATE"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              } border-none`}
            >
              {log.action}
            </Badge>
          </div>
        </div>
        <div>
          <Text variant='ps' classNames='text-gray-500 font-medium'>
            Module
          </Text>
          <Text variant='pm' classNames='text-black mt-1'>
            {log.module}
          </Text>
        </div>
        <div>
          <Text variant='ps' classNames='text-gray-500 font-medium'>
            Status
          </Text>
          <div className='mt-1'>
            <Badge
              className={`${
                log.status === "SUCCESS"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              } border-none flex items-center gap-1 w-fit`}
            >
              {log.status === "SUCCESS" ? (
                <CheckCircle className='w-3 h-3' />
              ) : (
                <XCircle className='w-3 h-3' />
              )}
              {log.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Request Info */}
      <div>
        <Text variant='ps' classNames='text-gray-500 font-medium'>
          Request Details
        </Text>
        <div className='mt-2 grid grid-cols-2 gap-4'>
          <div>
            <Text variant='ps' classNames='text-gray-500'>
              Method
            </Text>
            <Badge
              className={`${
                log.method === "GET"
                  ? "bg-green-100 text-green-800"
                  : log.method === "POST"
                  ? "bg-blue-100 text-blue-800"
                  : log.method === "PUT"
                  ? "bg-yellow-100 text-yellow-800"
                  : log.method === "PATCH"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-red-100 text-red-800"
              } border-none font-mono text-xs mt-1`}
            >
              {log.method}
            </Badge>
          </div>
          <div>
            <Text variant='ps' classNames='text-gray-500'>
              Execution Time
            </Text>
            <Text variant='pm' classNames='text-black mt-1'>
              {log.executionTime}ms
            </Text>
          </div>
        </div>
        <div className='mt-2'>
          <Text variant='ps' classNames='text-gray-500'>
            Endpoint
          </Text>
          <Text
            variant='pm'
            classNames='text-black font-mono text-sm mt-1 break-all'
          >
            {log.endpoint}
          </Text>
        </div>
      </div>

      {/* System Info */}
      <div>
        <Text variant='ps' classNames='text-gray-500 font-medium'>
          System Information
        </Text>
        <div className='mt-2 grid grid-cols-2 gap-4'>
          <div>
            <Text
              variant='ps'
              classNames='text-gray-500 flex items-center gap-1'
            >
              <Globe className='w-3 h-3' />
              IP Address
            </Text>
            <Text variant='pm' classNames='text-black mt-1 font-mono'>
              {log.ipAddress}
            </Text>
          </div>
          <div>
            <Text
              variant='ps'
              classNames='text-gray-500 flex items-center gap-1'
            >
              <Monitor className='w-3 h-3' />
              Device
            </Text>
            <Text variant='pm' classNames='text-black mt-1 capitalize'>
              {log.device}
            </Text>
          </div>
          <div>
            <Text variant='ps' classNames='text-gray-500'>
              Browser
            </Text>
            <Text variant='pm' classNames='text-black mt-1'>
              {log.browser}
            </Text>
          </div>
          <div>
            <Text variant='ps' classNames='text-gray-500'>
              OS
            </Text>
            <Text variant='pm' classNames='text-black mt-1'>
              {log.os}
            </Text>
          </div>
        </div>
      </div>

      {/* Request Data */}
      {/* {log.requestData && Object.keys(log.requestData).length > 0 && (
        <div>
          <Text variant='ps' classNames='text-gray-500 font-medium'>
            Request Data
          </Text>
          <div className='mt-2 bg-gray-50 p-3 rounded-lg'>
            <pre className='text-xs text-gray-700 whitespace-pre-wrap break-all'>
              {JSON.stringify(log.requestData, null, 2)}
            </pre>
          </div>
        </div>
      )} */}

      {/* Response Data */}
      {/* {log.responseData && (
        <div>
          <Text variant='ps' classNames='text-gray-500 font-medium'>
            Response Data
          </Text>
          <div className='mt-2 bg-gray-50 p-3 rounded-lg'>
            <pre className='text-xs text-gray-700 whitespace-pre-wrap break-all'>
              {typeof log.responseData === "string"
                ? log.responseData
                : JSON.stringify(log.responseData, null, 2)}
            </pre>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AuditLogs;
