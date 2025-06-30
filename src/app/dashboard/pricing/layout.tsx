import React from "react";

const Pricing = ({
  priceForm,
  prices,
}: {
  priceForm: React.ReactNode;
  prices: React.ReactNode;
}) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pricing</h1>
      <div className="grid grid-cols-3 gap-6">
        {priceForm}
        <div className="col-span-2">{prices}</div>
      </div>
    </div>
  );
};

export default Pricing;
