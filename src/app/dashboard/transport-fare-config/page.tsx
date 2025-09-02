// "use client";

// import React, { useState } from "react";
// import { Plus, Edit, Trash2, UploadCloud, Search } from "lucide-react";
// import { Text } from "@/components/atoms/text";
// import { CustomTable } from "@/components/organism/custom-table";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import CustomInput from "@/components/atoms/custom-input";
// import CustomPagination from "@/components/molecules/CustomPagination";
// import { useToast } from "@/components/ui/use-toast";
// import useTransportFareHook from "@/hooks/useTransportFare.hook";
// import TransportConfigForm from "@/components/features/transport-fare/transport-config-form";
// import LoadPointForm from "@/components/features/transport-fare/load-point-form";
// import DistanceUploadForm from "@/components/features/transport-fare/distance-upload-form";
// import FareCalculatorForm from "@/components/features/transport-fare/fare-calculator-form";
// import { CreateTransportConfigDto, TransportConfigDto } from "@/types/transport-fare.types";

// const TransportFareConfigPage = () => {
//   const { toast } = useToast();
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState<"configs" | "load-points" | "distances" | "calculator">(
//     "configs"
//   );

//   const [isCreateConfigOpen, setIsCreateConfigOpen] = useState(false);
//   const [selectedConfig, setSelectedConfig] = useState<TransportConfigDto | null>(null);
//   const [isCreateLoadPointOpen, setIsCreateLoadPointOpen] = useState(false);
//   const [isUploadDistancesOpen, setIsUploadDistancesOpen] = useState(false);

//   const limit = 10;

//   const {
//     useFetchTransportConfigs,
//     useCreateTransportConfig,
//     useDeleteTransportConfig,
//     useFetchLoadPoints,
//     useCreateLoadPoint,
//     useFetchDistances,
//     useBulkUploadDistances,
//     useCalculateFare,
//   } = useTransportFareHook();

//   const { data: configsData, isLoading: loadingConfigs } = useFetchTransportConfigs({ page, limit, key: searchTerm || undefined });
//   const { data: loadPointsData, isLoading: loadingLoadPoints } = useFetchLoadPoints();
//   const { data: distancesData, isLoading: loadingDistances } = useFetchDistances({ page, limit, key: searchTerm || undefined });

//   const createConfigMutation = useCreateTransportConfig();
//   const deleteConfigMutation = useDeleteTransportConfig();
//   const createLoadPointMutation = useCreateLoadPoint();
//   const bulkUploadMutation = useBulkUploadDistances();
//   const calculateFareMutation = useCalculateFare();

//   const columns = [
//     { header: "Key", accessorKey: "key" },
//     { header: "Value", accessorKey: "value", cell: ({ row }: any) => <Text variant='ps' classNames='text-black'>{row.original.value}</Text> },
//     { header: "Description", accessorKey: "description", cell: ({ row }: any) => <Text variant='ps' classNames='text-gray-600'>{row.original.description || '-'}</Text> },
//     { header: "Actions", accessorKey: "actions", cell: ({ row }: any) => {
//       const cfg = row.original as TransportConfigDto;
//       return (
//         <div className='flex items-center gap-2'>
//           <Button size='sm' variant='ghost' onClick={() => { setSelectedConfig(cfg); setIsCreateConfigOpen(true); }}>
//             <Edit className='w-4 h-4' />
//           </Button>
//           <Button size='sm' variant='ghost' onClick={() => deleteConfig(cfg.key)}>
//             <Trash2 className='w-4 h-4' />
//           </Button>
//         </div>
//       );
//     } }
//   ];

//   const deleteConfig = async (key: string) => {
//     try {
//       await deleteConfigMutation.mutateAsync(key);
//       toast({ title: 'Configuration deleted', description: '' });
//     } catch (err: any) {
//       toast({ title: 'Error deleting configuration', description: err?.message || String(err) });
//     }
//   };

//   const handleCreateConfig = async (data: CreateTransportConfigDto) => {
//     try {
//       await createConfigMutation.mutateAsync(data);
//       setIsCreateConfigOpen(false);
//     } catch (err: any) {
//       toast({ title: 'Error creating configuration', description: err?.message || String(err) });
//     }
//   };

//   const handleCreateLoadPoint = async (data: any) => {
//     try {
//       await createLoadPointMutation.mutateAsync(data);
//       setIsCreateLoadPointOpen(false);
//     } catch (err: any) {
//       toast({ title: 'Error creating load point', description: err?.message || String(err) });
//     }
//   };

//   const handleBulkUpload = async (rows: any[]) => {
//     try {
//       await bulkUploadMutation.mutateAsync(rows);
//       setIsUploadDistancesOpen(false);
//     } catch (err: any) {
//       toast({ title: 'Error uploading distances', description: err?.message || String(err) });
//     }
//   };

//   return (
//     <div className='p-6'>
//       <div className='flex items-center justify-between mb-6'>
//         <div>
//           <h1 className='text-2xl font-bold'>Transport Fare Configuration</h1>
//           <Text variant='pm' classNames='text-gray-500 mt-1'>Manage transport calculation parameters, load points and distances</Text>
//         </div>
//       </div>

//       <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className='w-full'>
//         <TabsList className='grid w-full max-w-xl grid-cols-4 mb-6'>
//           <TabsTrigger value='configs' className='flex items-center gap-2'>Configurations</TabsTrigger>
//           <TabsTrigger value='load-points' className='flex items-center gap-2'>Load Points</TabsTrigger>
//           <TabsTrigger value='distances' className='flex items-center gap-2'>Distances</TabsTrigger>
//           <TabsTrigger value='calculator' className='flex items-center gap-2'>Fare Calculator</TabsTrigger>
//         </TabsList>

//         <TabsContent value='configs' className='space-y-4'>
//           <div className='flex items-center justify-between mb-4'>
//             <div className='flex items-center gap-4'>
//               <CustomInput placeholder='Search by key' value={searchTerm} onChange={(e:any) => { setSearchTerm(e.target.value); setPage(1); }} className='max-w-[320px] h-10' name='search' />
//             </div>
//             <Button onClick={() => { setSelectedConfig(null); setIsCreateConfigOpen(true); }}>
//               <Plus className='w-4 h-4 mr-2' /> Add Configuration
//             </Button>
//           </div>

//           <div className='bg-white rounded-lg border'>
//             <CustomTable columns={columns} data={configsData?.data || []} loading={loadingConfigs} emptyState={{ title: 'No Configurations', message: 'There are no transport configurations to display.' }} />
//           </div>

//           <CustomPagination handleNextPage={() => setPage(page + 1)} handlePreviousPage={() => setPage(Math.max(1, page - 1))} />
//         </TabsContent>

//         <TabsContent value='load-points' className='space-y-4'>
//           <div className='flex items-center justify-between mb-4'>
//             <div className='flex items-center gap-4'>
//               <CustomInput placeholder='Search load points' value={searchTerm} onChange={(e:any)=>{ setSearchTerm(e.target.value); setPage(1); }} className='max-w-[320px] h-10' name='search' />
//             </div>
//             <div className='flex items-center gap-2'>
//               <Button onClick={() => setIsCreateLoadPointOpen(true)}>
//                 <Plus className='w-4 h-4 mr-2' /> Add Load Point
//               </Button>
//             </div>
//           </div>

//           <div className='bg-white rounded-lg border p-4'>
//             <CustomTable columns={[{header: 'Name', accessorKey: 'name'}, {header: 'State', accessorKey: 'state'}, {header: 'LGA', accessorKey: 'lga'}]} data={loadPointsData?.data || []} loading={loadingLoadPoints} emptyState={{ title: 'No Load Points', message: 'There are no load points to display.' }} />
//           </div>
//         </TabsContent>

//         <TabsContent value='distances' className='space-y-4'>
//           <div className='flex items-center justify-between mb-4'>
//             <div className='flex items-center gap-4'>
//               <CustomInput placeholder='Search distances' value={searchTerm} onChange={(e:any)=>{ setSearchTerm(e.target.value); setPage(1); }} className='max-w-[320px] h-10' name='search' />
//             </div>
//             <div className='flex items-center gap-2'>
//               <Button onClick={() => setIsUploadDistancesOpen(true)}>
//                 <UploadCloud className='w-4 h-4 mr-2' /> Bulk Upload
//               </Button>
//             </div>
//           </div>

//           <div className='bg-white rounded-lg border p-4'>
//             <CustomTable columns={[{header:'State', accessorKey:'state'},{header:'LGA', accessorKey:'lga'},{header:'LoadPoint', accessorKey:'loadPoint'},{header:'DistanceKM', accessorKey:'distanceKM'}]} data={distancesData?.data || []} loading={loadingDistances} emptyState={{ title: 'No Distances', message: 'No distance records found.' }} />
//           </div>

//           <CustomPagination handleNextPage={() => setPage(page + 1)} handlePreviousPage={() => setPage(Math.max(1, page - 1))} />
//         </TabsContent>

//         <TabsContent value='calculator' className='space-y-4'>
//           <div className='bg-white rounded-lg border p-6'>
//             <FareCalculatorForm onCalculate={(payload:any) => calculateFareMutation.mutateAsync(payload)} isLoading={calculateFareMutation.isLoading} />
//             {calculateFareMutation.data && (
//               <div className='mt-4'>
//                 <Text variant='ps' classNames='font-semibold'>Result</Text>
//                 <pre className='bg-gray-100 p-3 rounded mt-2 text-sm overflow-auto'>{JSON.stringify(calculateFareMutation.data, null, 2)}</pre>
//               </div>
//             )}
//           </div>
//         </TabsContent>
//       </Tabs>

//       {/* Modals */}
//       <Dialog open={isCreateConfigOpen} onOpenChange={(open)=>{ if(!open){ setIsCreateConfigOpen(false); setSelectedConfig(null); } }}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{selectedConfig ? 'Edit Transport Config' : 'Create Transport Config'}</DialogTitle>
//           </DialogHeader>
//           <TransportConfigForm initialData={selectedConfig || undefined} onSubmit={handleCreateConfig} onCancel={() => { setIsCreateConfigOpen(false); setSelectedConfig(null); }} isLoading={createConfigMutation.isLoading} isEditMode={!!selectedConfig} />
//         </DialogContent>
//       </Dialog>

//       <Dialog open={isCreateLoadPointOpen} onOpenChange={(open)=>{ if(!open) setIsCreateLoadPointOpen(false); }}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Create Load Point</DialogTitle>
//           </DialogHeader>
//           <LoadPointForm onSubmit={handleCreateLoadPoint} onCancel={() => setIsCreateLoadPointOpen(false)} isLoading={createLoadPointMutation.isLoading} />
//         </DialogContent>
//       </Dialog>

//       <Dialog open={isUploadDistancesOpen} onOpenChange={(open)=>{ if(!open) setIsUploadDistancesOpen(false); }}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Bulk Upload Distances</DialogTitle>
//           </DialogHeader>
//           <DistanceUploadForm onUpload={handleBulkUpload} onCancel={() => setIsUploadDistancesOpen(false)} isLoading={bulkUploadMutation.isLoading} />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default TransportFareConfigPage;
"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2, UploadCloud, Search } from "lucide-react";
import { Text } from "@/components/atoms/text";
import { CustomTable } from "@/components/organism/custom-table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CustomInput from "@/components/atoms/custom-input";
import CustomPagination from "@/components/molecules/CustomPagination";
import { useToast } from "@/components/ui/use-toast";
import useTransportFareHook from "@/hooks/useTransportFare.hook";
import TransportConfigForm from "@/components/features/transport-fare/transport-config-form";
import LoadPointForm from "@/components/features/transport-fare/load-point-form";
import DistanceUploadForm from "@/components/features/transport-fare/distance-upload-form";
import FareCalculatorForm from "@/components/features/transport-fare/fare-calculator-form";
import { CreateTransportConfigDto, TransportConfigDto } from "@/types/transport-fare.types";

const TransportFareConfigPage = () => {
  const { toast } = useToast();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"configs" | "load-points" | "distances" | "calculator">(
    "configs"
  );

  const [isCreateConfigOpen, setIsCreateConfigOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<TransportConfigDto | null>(null);
  const [isCreateLoadPointOpen, setIsCreateLoadPointOpen] = useState(false);
  const [isUploadDistancesOpen, setIsUploadDistancesOpen] = useState(false);

  const limit = 10;

  const {
    useFetchTransportConfigs,
    useCreateTransportConfig,
  useUpdateTransportConfig,
    useDeleteTransportConfig,
    useFetchLoadPoints,
    useCreateLoadPoint,
    useFetchDistances,
    useBulkUploadDistances,
    useCalculateFare,
  } = useTransportFareHook();

  const { data: configsData, isLoading: loadingConfigs } = useFetchTransportConfigs({ page, limit, key: searchTerm || undefined });
  const { data: loadPointsData, isLoading: loadingLoadPoints } = useFetchLoadPoints();
  const { data: distancesData, isLoading: loadingDistances } = useFetchDistances({ page, limit, key: searchTerm || undefined });

  const createConfigMutation = useCreateTransportConfig();
  const updateConfigMutation = useUpdateTransportConfig();
  const deleteConfigMutation = useDeleteTransportConfig();
  const createLoadPointMutation = useCreateLoadPoint();
  const bulkUploadMutation = useBulkUploadDistances();
  const calculateFareMutation = useCalculateFare();

  const columns = [
    { header: "Key", accessorKey: "key" },
    { header: "Value", accessorKey: "value", cell: ({ row }: any) => <Text variant='ps' classNames='text-black'>{row.original.value}</Text> },
    { header: "Description", accessorKey: "description", cell: ({ row }: any) => <Text variant='ps' classNames='text-gray-600'>{row.original.description || '-'}</Text> },
    { header: "Actions", accessorKey: "actions", cell: ({ row }: any) => {
      const cfg = row.original as TransportConfigDto;
      return (
        <div className='flex items-center gap-2'>
          <Button size='sm' variant='ghost' onClick={() => { setSelectedConfig(cfg); setIsCreateConfigOpen(true); }}>
            <Edit className='w-4 h-4' />
          </Button>
          <Button size='sm' variant='ghost' onClick={() => deleteConfig(cfg.key)}>
            <Trash2 className='w-4 h-4' />
          </Button>
        </div>
      );
    } }
  ];

  const deleteConfig = async (key: string) => {
    try {
      await deleteConfigMutation.mutateAsync(key);
      toast({ title: 'Configuration deleted', description: '' });
    } catch (err: any) {
      toast({ title: 'Error deleting configuration', description: err?.message || String(err) });
    }
  };

  const handleCreateConfig = async (data: CreateTransportConfigDto | any) => {
    try {
      if (selectedConfig) {
        // update flow: use PUT endpoint with key param
        await updateConfigMutation.mutateAsync({ key: selectedConfig.key, data });
      } else {
        await createConfigMutation.mutateAsync(data);
      }
      setIsCreateConfigOpen(false);
    } catch (err: any) {
      toast({ title: 'Error creating configuration', description: err?.message || String(err) });
    }
  };

  const handleCreateLoadPoint = async (data: any) => {
    try {
      await createLoadPointMutation.mutateAsync(data);
      setIsCreateLoadPointOpen(false);
    } catch (err: any) {
      toast({ title: 'Error creating load point', description: err?.message || String(err) });
    }
  };

  const handleBulkUpload = async (rows: any[]) => {
    try {
      await bulkUploadMutation.mutateAsync(rows);
      setIsUploadDistancesOpen(false);
    } catch (err: any) {
      toast({ title: 'Error uploading distances', description: err?.message || String(err) });
    }
  };

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold'>Transport Fare Configuration</h1>
          <Text variant='pm' classNames='text-gray-500 mt-1'>Manage transport calculation parameters, load points and distances</Text>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className='w-full'>
        <TabsList className='grid w-full max-w-xl grid-cols-4 mb-6'>
          <TabsTrigger value='configs' className='flex items-center gap-2'>Configurations</TabsTrigger>
          <TabsTrigger value='load-points' className='flex items-center gap-2'>Load Points</TabsTrigger>
          <TabsTrigger value='distances' className='flex items-center gap-2'>Distances</TabsTrigger>
          <TabsTrigger value='calculator' className='flex items-center gap-2'>Fare Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value='configs' className='space-y-4'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-4'>
              <CustomInput placeholder='Search by key' value={searchTerm} onChange={(e:any) => { setSearchTerm(e.target.value); setPage(1); }} className='max-w-[320px] h-10' name='search' />
            </div>
            {/* <Button onClick={() => { setSelectedConfig(null); setIsCreateConfigOpen(true); }}>
              <Plus className='w-4 h-4 mr-2' /> Add Configuration
            </Button> */}
          </div>

          <div className='bg-white rounded-lg border'>
            <CustomTable columns={columns} data={configsData?.data || []} loading={loadingConfigs} emptyState={{ title: 'No Configurations', message: 'There are no transport configurations to display.' }} />
          </div>

          <CustomPagination handleNextPage={() => setPage(page + 1)} handlePreviousPage={() => setPage(Math.max(1, page - 1))} />
        </TabsContent>

        <TabsContent value='load-points' className='space-y-4'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-4'>
              <CustomInput placeholder='Search load points' value={searchTerm} onChange={(e:any)=>{ setSearchTerm(e.target.value); setPage(1); }} className='max-w-[320px] h-10' name='search' />
            </div>
            <div className='flex items-center gap-2'>
              <Button onClick={() => setIsCreateLoadPointOpen(true)}>
                <Plus className='w-4 h-4 mr-2' /> Add Load Point
              </Button>
            </div>
          </div>

          <div className='bg-white rounded-lg border p-4'>
            <CustomTable columns={[{header: 'Name', accessorKey: 'name'}, {header: 'State', accessorKey: 'state'}, {header: 'LGA', accessorKey: 'lga'}]} data={loadPointsData?.data || []} loading={loadingLoadPoints} emptyState={{ title: 'No Load Points', message: 'There are no load points to display.' }} />
          </div>
        </TabsContent>

        <TabsContent value='distances' className='space-y-4'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-4'>
              <CustomInput placeholder='Search distances' value={searchTerm} onChange={(e:any)=>{ setSearchTerm(e.target.value); setPage(1); }} className='max-w-[320px] h-10' name='search' />
            </div>
            <div className='flex items-center gap-2'>
              <Button onClick={() => setIsUploadDistancesOpen(true)}>
                <UploadCloud className='w-4 h-4 mr-2' /> Bulk Upload
              </Button>
            </div>
          </div>

          <div className='bg-white rounded-lg border p-4'>
            <CustomTable columns={[{header:'State', accessorKey:'state'},{header:'LGA', accessorKey:'lga'},{header:'LoadPoint', accessorKey:'loadPoint'},{header:'DistanceKM', accessorKey:'distanceKM'}]} data={distancesData?.data || []} loading={loadingDistances} emptyState={{ title: 'No Distances', message: 'No distance records found.' }} />
          </div>

          <CustomPagination handleNextPage={() => setPage(page + 1)} handlePreviousPage={() => setPage(Math.max(1, page - 1))} />
        </TabsContent>

        <TabsContent value='calculator' className='space-y-4'>
          <div className='bg-white rounded-lg border p-6'>
            <FareCalculatorForm onCalculate={(payload:any) => calculateFareMutation.mutateAsync(payload)} isLoading={calculateFareMutation.isPending} loadPoints={loadPointsData?.data || []} />
            {/* Raw JSON debug output removed - FareCalculatorForm now shows a formatted result */}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <Dialog open={isCreateConfigOpen} onOpenChange={(open)=>{ if(!open){ setIsCreateConfigOpen(false); setSelectedConfig(null); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedConfig ? 'Edit Transport Config' : 'Create Transport Config'}</DialogTitle>
          </DialogHeader>
          <TransportConfigForm initialData={selectedConfig || undefined} onSubmit={handleCreateConfig} onCancel={() => { setIsCreateConfigOpen(false); setSelectedConfig(null); }} isLoading={createConfigMutation.isPending || updateConfigMutation.isPending} isEditMode={!!selectedConfig} />
        </DialogContent>
      </Dialog>

      <Dialog open={isCreateLoadPointOpen} onOpenChange={(open)=>{ if(!open) setIsCreateLoadPointOpen(false); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Load Point</DialogTitle>
          </DialogHeader>
          <LoadPointForm onSubmit={handleCreateLoadPoint} onCancel={() => setIsCreateLoadPointOpen(false)} isLoading={createLoadPointMutation.isPending} />
        </DialogContent>
      </Dialog>

      <Dialog open={isUploadDistancesOpen} onOpenChange={(open)=>{ if(!open) setIsUploadDistancesOpen(false); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Upload Distances</DialogTitle>
          </DialogHeader>
          <DistanceUploadForm onUpload={handleBulkUpload} onCancel={() => setIsUploadDistancesOpen(false)} isLoading={bulkUploadMutation.isPending} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransportFareConfigPage;
