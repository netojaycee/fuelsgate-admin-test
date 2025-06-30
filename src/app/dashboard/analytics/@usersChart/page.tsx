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
  const { useFetchAdminRecentUsers } = useAdminHook();
  const { data: users, isLoading } = useFetchAdminRecentUsers(
    `?date=${date.value}`
  );

  const handleDateChange = useCallback((value: unknown) => {
    setDate(value as CustomSelectOption);
  }, []);

  const formattedUsersData = useMemo(() => {
    return (
      users?.data.reduce((acc: any[], user: any) => {
        const date = new Date(user.createdAt).toLocaleDateString();
        const existingDate = acc.find((item) => item.createdAt === date);

        if (existingDate) {
          existingDate.noOfUsers++;
        } else {
          acc.push({
            noOfUsers: 1,
            createdAt: date,
          });
        }

        return acc;
      }, []) || []
    );
  }, [users]);

  if (isLoading) {
    return (
      <div className="col-span-full h-[400px]">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="col-span-full">
      <ChartCard title="Users" date={date} handleDateChange={handleDateChange}>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedUsersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="createdAt" />
              <YAxis />
              <Tooltip contentStyle={{ color: "#000000" }} />
              <Bar
                type="monotone"
                dataKey="noOfUsers"
                stroke="#D4B172"
                fill="#D4B17230"
                name="Users"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
