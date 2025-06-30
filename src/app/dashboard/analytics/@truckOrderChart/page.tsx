"use client";

import { CustomSelectOption } from "@/components/atoms/custom-select";
import ChartCard from "@/components/molecules/ChartCard";
import { Skeleton } from "@/components/ui/skeleton";
import useAdminHook from "@/hooks/useAdmin.hook";
import { useCallback, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ChartsPage() {
  const [date, setDate] = useState<CustomSelectOption>({
    label: "This Year",
    value: "thisYear",
  });
  const { useFetchAdminRecentTruckOrders } = useAdminHook();
  const { data: truckOrders, isLoading } = useFetchAdminRecentTruckOrders(
    `?date=${date.value}`
  );

  const formattedTruckOrdersData = useMemo(() => {
    return (
      truckOrders?.data.reduce((acc: any[], user: any) => {
        const date = new Date(user.createdAt).toLocaleDateString();
        const existingDate = acc.find((item) => item.createdAt === date);

        if (existingDate) {
          existingDate.noOfTruckOrders++;
        } else {
          acc.push({
            noOfTruckOrders: 1,
            createdAt: date,
          });
        }

        return acc;
      }, []) || []
    );
  }, [truckOrders]);

  const handleDateChange = useCallback((value: unknown) => {
    setDate(value as CustomSelectOption);
  }, []);

  if (isLoading) {
    return (
      <div className="h-[400px]">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <ChartCard
      title="Truck Orders"
      date={date}
      handleDateChange={handleDateChange}
    >
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedTruckOrdersData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip contentStyle={{ color: "#000000" }} />
            <Bar
              type="monotone"
              dataKey="noOfTruckOrders"
              stroke="#D4B172"
              fill="#D4B17230"
              name="Truck Orders"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
