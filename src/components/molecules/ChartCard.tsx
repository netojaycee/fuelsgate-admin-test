import React from "react";
import { Card } from "../ui/card";
import { CustomSelect, CustomSelectOption } from "../atoms/custom-select";

const ChartCard = ({
  title,
  children,
  handleDateChange,
  date,
}: {
  title: string;
  children: React.ReactNode;
  handleDateChange?: (value: unknown) => void;
  date?: CustomSelectOption;
}) => (
  <Card className="p-4">
    <div className="flex items-center justify-between flex-wrap mb-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {handleDateChange && (
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
      )}
    </div>
    {children}
  </Card>
);

export default ChartCard;
