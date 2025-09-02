"use client";

import React, { useState, useMemo } from "react";
import CustomInput from "@/components/atoms/custom-input";
import { CustomSelect } from "@/components/atoms/custom-select";
import { Text } from "@/components/atoms/text";
import CustomPagination from "@/components/molecules/CustomPagination";
import { CustomTable } from "@/components/organism/custom-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FilterIcon,
  CheckCircle,
  XCircle,
  Users as UsersIcon,
  UserPlus,
} from "lucide-react";
import useUserHook from "@/hooks/useUser.hook";
import { Trash2, Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatDate } from "@/utils/formatDate";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  lastSeen?: string;
}

const Users = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const { useFetchUsers, useUpdateUserStatus, useDeleteUser } = useUserHook();
  const updateStatusMutation = useUpdateUserStatus();
  const deleteUserMutation = useDeleteUser();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Clear status filter when switching to new users tab
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "new") {
      setSelectedStatus([]);
    }
  };
  // Build query parameters based on active tab
  const queryParams = useMemo(() => {
    const params = new URLSearchParams();

    if (searchTerm) params.append("search", searchTerm);
    if (selectedRole.length > 0) params.append("role", selectedRole.join(","));

    if (activeTab === "all") {
      // If status filter is selected, use it; otherwise show active and suspended
      if (selectedStatus.length > 0) {
        params.append("status", selectedStatus.join(","));
      } else {
        params.append("status", "active,suspended");
      }
    } else if (activeTab === "new") {
      params.append("status", "pending");
    }

    // console.log("Query params:", params.toString());
    return params.toString();
  }, [activeTab, searchTerm, selectedRole, selectedStatus]);

  const { data: usersData, isLoading } = useFetchUsers(queryParams);

  console.log("Users data:", usersData);
  const users = (usersData?.data?.users || [])
    .slice()
    .sort((a: any, b: any) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

  const handleStatusUpdate = async (userId: string, newStatus: string) => {
    try {
      await updateStatusMutation.mutateAsync({ userId, status: newStatus });
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: {
        variant: "default",
        label: "Active",
        color: "bg-green-100 text-green-800",
      },
      suspended: {
        variant: "secondary",
        label: "Suspended",
        color: "bg-red-100 text-red-800",
      },
      pending: {
        variant: "outline",
        label: "Pending",
        color: "bg-orange-100 text-orange-800",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.active;

    return (
      <Badge className={`${config.color} border-none`}>{config.label}</Badge>
    );
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "firstName",
      cell: ({ row }: { row: any }) => {
        const user = row.original;
        return (
          <div className='flex flex-col'>
            <Text variant='ps' classNames='text-black font-medium'>
              {user.firstName} {user.lastName}
            </Text>
            <Text variant='ps' classNames='text-gray-500 text-sm'>
              {user.email}
            </Text>
          </div>
        );
      },
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: ({ row }: { row: any }) => {
        const roleMap = {
          seller: "Supplier",
          buyer: "Trader",
          transporter: "Transporter",
          admin: "Admin",
        };
        return (
          <Text variant='ps' classNames='text-black capitalize'>
            {roleMap[row.original.role as keyof typeof roleMap] ||
              row.original.role}
          </Text>
        );
      },
    },
    {
      header: "Phone",
      accessorKey: "phoneNumber",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-gray-600'>
          {row?.original?.phoneNumber ? (
            row.original.phoneNumber
          ) : (
            <span className='italic text-gray-400'>Null</span>
          )}
        </Text>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",

      cell: ({ row }: { row: any }) => getStatusBadge(row.original.status),
    },
    {
      header: "Joined Date",
      accessorKey: "createdAt",
      cell: ({ row }: { row: any }) => (
        <Text variant='ps' classNames='text-gray-600'>
          {formatDate(row.original.createdAt)}
        </Text>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: { row: any }) => {
        const user = row.original;
        return (
          <div className='flex gap-2'>
            {activeTab === "new" && user.status === "pending" && (
              <Button
                size='sm'
                onClick={() => handleStatusUpdate(user._id, "active")}
                disabled={updateStatusMutation.isPending}
                className='bg-green-600 hover:bg-green-700 text-white'
              >
                <CheckCircle className='w-4 h-4 mr-1' />
                Activate
              </Button>
            )}
            {activeTab === "all" && (
              <>
                {user.status === "active" ? (
                  <Button
                    size='sm'
                    variant='destructive'
                    onClick={() => handleStatusUpdate(user._id, "suspended")}
                    disabled={updateStatusMutation.isPending}
                  >
                    <XCircle className='w-4 h-4 mr-1' />
                    Suspend
                  </Button>
                ) : (
                  <Button
                    size='sm'
                    onClick={() => handleStatusUpdate(user._id, "active")}
                    disabled={updateStatusMutation.isPending}
                    className='bg-green-600 hover:bg-green-700 text-white'
                  >
                    <CheckCircle className='w-4 h-4 mr-1' />
                    Unsuspend
                  </Button>
                )}
                <Button
                  size='sm'
                  variant='ghost'
                  onClick={() => {
                    setSelectedUser(user);
                    setDeleteDialogOpen(true);
                  }}
                  disabled={deleteUserMutation?.isPending}
                >
                  {deleteUserMutation?.isPending &&
                  selectedUser?._id === user._id ? (
                    <Loader2 className='animate-spin w-4 h-4 mr-1' />
                  ) : (
                    <Trash2 className='w-4 h-4 mr-1' />
                  )}
                  Delete
                </Button>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const handleNextPage = () => {
    console.log("Next page");
  };

  const handlePreviousPage = () => {
    console.log("Previous page");
  };

  const emptyStateMessage = {
    title: activeTab === "new" ? "No New Users" : "No Users Found",
    message:
      activeTab === "new"
        ? "There are no pending user registrations at the moment."
        : "There are no users to display at the moment.",
  };

  const roleOptions = [
    { label: "Supplier", value: "seller" },
    { label: "Transporter", value: "transporter" },
    { label: "Trader", value: "buyer" },
    { label: "Admin", value: "admin" },
  ];
  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Suspended", value: "suspended" },
  ];

  // Delete user handler
  const handleDeleteUser = async () => {
    if (!selectedUser?._id) return;
    // console.log("Deleting user with id:", selectedUser._id);
    try {
      await deleteUserMutation.mutateAsync(selectedUser._id);
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      // Optionally show toast
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>User Management</h1>
          <Text variant='pm' classNames='text-gray-500 mt-1'>
            Manage user accounts and permissions
          </Text>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className='w-full'
      >
        <TabsList className='grid w-full max-w-md grid-cols-2 mb-6'>
          <TabsTrigger value='all' className='flex items-center gap-2'>
            <UsersIcon className='w-4 h-4' />
            All Users
          </TabsTrigger>
          <TabsTrigger value='new' className='flex items-center gap-2'>
            <UserPlus className='w-4 h-4' />
            New Users
          </TabsTrigger>
        </TabsList>{" "}
        <div className='flex flex-wrap items-center gap-4 mb-6'>
          <Text variant='pm' classNames='text-gray-500 flex items-center gap-2'>
            <FilterIcon className='w-4 h-4' />
            Filter by:
          </Text>
          <CustomInput
            placeholder='Search for user'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='max-w-[320px] h-10'
            name='search'
          />{" "}
          <CustomSelect
            name='role'
            options={roleOptions}
            value={
              selectedRole
                .map((role) => roleOptions.find((opt) => opt.value === role))
                .filter(Boolean) as any
            }
            onChange={(selected: any) => {
              if (Array.isArray(selected)) {
                setSelectedRole(selected.map((item: any) => item.value));
              } else {
                setSelectedRole(selected ? [selected.value] : []);
              }
            }}
            height='40px'
            classNames='max-w-[320px]'
            multiple
            {...{
              placeholder: "Select role",
            }}
          />
          {activeTab === "all" && (
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
              classNames='max-w-[320px]'
              multiple
              {...{
                placeholder: "Select status",
              }}
            />
          )}
        </div>
        <TabsContent value='all' className='space-y-4'>
          <div className='bg-white rounded-lg border'>
            <CustomTable
              columns={columns}
              data={users}
              loading={isLoading}
              emptyState={emptyStateMessage}
            />
          </div>
        </TabsContent>
        <TabsContent value='new' className='space-y-4'>
          <div className='bg-white rounded-lg border'>
            <CustomTable
              columns={columns.filter(
                (col) => col.header !== "Status" || activeTab === "new"
              )}
              data={users}
              loading={isLoading}
              emptyState={emptyStateMessage}
            />
          </div>
        </TabsContent>
      </Tabs>

      <CustomPagination
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={deleteUserMutation?.isPending}
            >
              {deleteUserMutation?.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Users;
