import Navbar from "@/components/common/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="mt-20">{children}</div>
    </>
  );
};

export default DashboardLayout;
