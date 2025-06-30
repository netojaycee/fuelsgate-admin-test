"use client";

import { CustomSelect } from "@/components/atoms/custom-select";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useAdminHook from "@/hooks/useAdmin.hook";
import { useCallback, useState } from "react";

interface StatCardProps {
  title: string;
  value: number;
  change?: number;
}

const StatCard = ({ title, value, change }: StatCardProps) => (
  <Card className="p-4 bg-white">
    <h3 className="text-sm text-gray-500">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
    {change !== undefined && (
      <p
        className={`text-sm ${change >= 0 ? "text-green-500" : "text-red-500"}`}
      >
        {change >= 0 ? "+" : ""}
        {change}%
      </p>
    )}
  </Card>
);

export default function OverviewPage() {
  const [date, setDate] = useState({ label: "Today", value: "today" });
  const { useFetchAdminAnalytics, useFetchAdminRecentAnalytics } =
    useAdminHook();
  const { data: analytics, isLoading } = useFetchAdminAnalytics();
  const { data: recentAnalytics, isLoading: isRecentLoading } =
    useFetchAdminRecentAnalytics(`?date=${date.value}`);

  const stats = {
    ...analytics?.data,
    new: {
      ...recentAnalytics?.data,
    },
  };

  const handleDateChange = useCallback((value: unknown) => {
    setDate(value as { label: string; value: string });
  }, []);

  return (
    <>
      <RecentRecords />
      <TotalRecords />
    </>
  );
}

const RecentRecords = () => {
  const [date, setDate] = useState({ label: "This Year", value: "thisYear" });
  const { useFetchAdminRecentAnalytics } = useAdminHook();
  const { data, isLoading } = useFetchAdminRecentAnalytics(
    `?date=${date.value}`
  );

  const handleDateChange = useCallback((value: unknown) => {
    setDate(value as { label: string; value: string });
  }, []);

  if (isLoading) {
    return (
      <Card className="p-4 col-span-full mb-4 bg-white">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="w-[200px] h-10" />
          <Skeleton className="w-[100px] h-10" />
        </div>
        <div className="grid grid-cols-5 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-20" />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 col-span-full mb-4 bg-gold/20">
      <div className="flex items-center flex-wrap justify-between mb-5">
        <h3 className="text-lg font-semibold mb-3">Recent Activities</h3>
        <CustomSelect
          options={[
            { label: "Today", value: "today" },
            { label: "This Week", value: "thisWeek" },
            { label: "This Month", value: "thisMonth" },
            { label: "This Year", value: "thisYear" },
            { label: "Last Week", value: "lastWeek" },
            { label: "Last Month", value: "lastMonth" },
            { label: "Last 3 Months", value: "last3Months" },
            { label: "Last 6 Months", value: "last6Months" },
            { label: "Last Year", value: "lastYear" },
          ]}
          onChange={handleDateChange}
          name="recentActivities"
          classNames="w-fit"
          height={"40px"}
          value={date}
        />
      </div>

      <div className="grid grid-cols-5 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-4">
        <StatCard title="Users" value={data?.data?.users} />
        <StatCard title="Products" value={data?.data?.productsUploads} />
        <StatCard title="Offers" value={data?.data?.offers} />
        <StatCard title="Truck Orders" value={data?.data?.truckOrders} />
        <StatCard title="Locked Volumes" value={data?.data?.productOrders} />
      </div>
    </Card>
  );
};

const TotalRecords = () => {
  const { useFetchAdminAnalytics } = useAdminHook();
  const { data: analytics, isLoading } = useFetchAdminAnalytics();

  if (isLoading) {
    return (
      <div className="col-span-full grid grid-cols-4 max-sm:grid-cols-1 max-lg:grid-cols-2 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-20" />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Total counts */}
      <StatCard title="Total Users" value={analytics?.data?.totalUsers} />
      <StatCard
        title="Total Uploaded Products"
        value={analytics?.data?.totalUploadedProducts}
      />
      <StatCard title="Total Trucks" value={analytics?.data?.totalTrucks} />
      <StatCard title="Total Offers" value={analytics?.data?.totalOffers} />
      <StatCard
        title="Total Truck Orders"
        value={analytics?.data?.totalTruckOrders}
      />
      <StatCard
        title="Total Locked Volumes"
        value={analytics?.data?.totalProductOrders}
      />
      <StatCard title="Total Products" value={analytics?.data?.totalProducts} />
      <StatCard title="Total Depots" value={analytics?.data?.totalDepots} />
    </>
  );
};
