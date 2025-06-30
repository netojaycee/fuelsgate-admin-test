import React from "react";

const AnalyticsLayout = ({
  usersChart,
  overview,
  productOrderChart,
  truckOrderChart,
  productUploadChart,
}: {
  usersChart: React.ReactNode;
  overview: React.ReactNode;
  productOrderChart: React.ReactNode;
  truckOrderChart: React.ReactNode;
  productUploadChart: React.ReactNode;
}) => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      {/* Overview section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overview}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {usersChart}
        {productOrderChart}
        {truckOrderChart}
        {productUploadChart}
      </div>
    </div>
  );
};

export default AnalyticsLayout;
