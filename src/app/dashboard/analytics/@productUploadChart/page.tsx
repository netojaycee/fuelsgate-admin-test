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
} from "recharts";

export default function ChartsPage() {
  const [date, setDate] = useState<CustomSelectOption>({
    label: "This Year",
    value: "thisYear",
  });
  const { useFetchAdminRecentProductUploads } = useAdminHook();
  const { data: productUploads, isLoading } = useFetchAdminRecentProductUploads(
    `?date=${date.value}`
  );

  const handleDateChange = useCallback((value: unknown) => {
    setDate(value as CustomSelectOption);
  }, []);

  const formattedProductUploadsData = useMemo(() => {
    return (
      productUploads?.data.reduce((acc: any[], user: any) => {
        const date = new Date(user.createdAt).toLocaleDateString();
        const existingDate = acc.find((item) => item.createdAt === date);

        if (existingDate) {
          existingDate.noOfProductUploads++;
        } else {
          acc.push({
            noOfProductUploads: 1,
            createdAt: date,
          });
        }

        return acc;
      }, []) || []
    );
  }, [productUploads]);

  if (isLoading) {
    return (
      <div className="col-span-full h-[400px]">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="col-span-full">
      <ChartCard
        title="Product Uploads"
        date={date}
        handleDateChange={handleDateChange}
      >
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedProductUploadsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="createdAt" />
              <YAxis />
              <Tooltip contentStyle={{ color: "#000000" }} />
              <Bar
                dataKey="noOfProductUploads"
                stroke="#D4B172"
                fill="#D4B17230"
                name="Product Uploads"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
