export interface AuditLog {
    _id: string;
    userId: string | {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    userEmail: string;
    userName: string;
    action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
    module: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    endpoint: string;
    requestData: {
        body?: any;
        params?: any;
        query?: any;
    };
    responseData: {
        message: string;
        [key: string]: any;
    };
    ipAddress: string;
    userAgent: string;
    browser: string;
    os: string;
    device: string;
    status: 'SUCCESS' | 'ERROR' | 'FAILED';
    executionTime: number;
    createdAt: string;
    updatedAt: string;
}

export interface AuditLogsResponse {
    logs: AuditLog[];
    total: number;
    currentPage: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface AuditLogFilters {
    search?: string;
    module?: string;
    action?: string;
    status?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}
