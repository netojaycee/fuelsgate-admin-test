"use client";

import { CustomSelectOption } from "@/components/atoms/custom-select";
import ChartCard from "@/components/molecules/ChartCard";
import { Skeleton } from "@/components/ui/skeleton";
import useAdminHook from "@/hooks/useAdmin.hook";
import { useCallback, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";

export default function ChartsPage() {
  const [date, setDate] = useState<CustomSelectOption>({
    label: "This Year",
    value: "thisYear",
  });
  const { useFetchAdminRecentProductOrders } = useAdminHook();
  const { data: productOrders, isLoading } = useFetchAdminRecentProductOrders(
    `?date=${date.value}`
  );

  const handleDateChange = useCallback((value: unknown) => {
    setDate(value as CustomSelectOption);
  }, []);

  const formattedProductUploadData = useMemo(() => {
    return (
      productOrders?.data.reduce((acc: any[], user: any) => {
        const date = new Date(user.createdAt).toLocaleDateString();
        const existingDate = acc.find((item) => item.createdAt === date);

        if (existingDate) {
          existingDate.noOfProductOrders++;
        } else {
          acc.push({
            noOfProductOrders: 1,
            createdAt: date,
          });
        }

        return acc;
      }, []) || []
    );
  }, [productOrders]);

  if (isLoading) {
    return (
      <div className="h-[400px]">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <ChartCard
      title="Product Orders"
      date={date}
      handleDateChange={handleDateChange}
    >
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedProductUploadData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" />
            <YAxis />
            <Tooltip contentStyle={{ color: "#000000" }} />
            <Bar
              type="monotone"
              dataKey="noOfProductOrders"
              stroke="#D4B172"
              fill="#D4B17230"
              name="Product Orders"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
