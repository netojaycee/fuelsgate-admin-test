import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomLoader from "@/components/atoms/custom-loader";
import Image from "next/image";
import OrderEmptyState from "@assets/images/OrderEmptyState.svg";
import { Text } from "@/components/atoms/text";

export type RowPinningPosition = false | "top" | "bottom";

export type RowPinningState = {
  top?: string[];
  bottom?: string[];
};

export type RowPinningRowState = {
  rowPinning: RowPinningState;
};

type TData = any;
type TValue = any;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  emptyState?: { title: string; message: string };
}

// TODO: write the props for this component
// TODO: handle the pin and unpin feature
// TODO: handle className props
// TODO: handle empty record : allow passing empty record component as props
const CustomTable = ({
  data,
  columns,
  loading,
  emptyState,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowPinning: true,
    keepPinnedRows: true,
  });

  return (
    <Table className="my-5 border-separate border-spacing-y-3 w-full">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header, index) => {
              return (
                <TableHead
                  key={header.id}
                  className={cn(
                    "h-[38px] text-sm bg-light-gray-300 whitespace-nowrap",
                    index === 0
                      ? "rounded-l-xl"
                      : index === headerGroup.headers.length - 1
                      ? "rounded-r-xl"
                      : ""
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {/* Pin to left control */}
                  {/* {
                    header.column.getIsPinned() ? 
                    <button type='button' onClick={() => header.column.pin(false)}>Unpin</button> :
                    <button type='button' onClick={() => header.column.pin('left')}>Pin to left</button>
                  } */}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className="max-h-[40px]">
        {loading ? (
          <TableRow className="relative after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-full after:bg-mid-gray-400">
            <TableCell
              colSpan={columns.length}
              className="py-3 text-sm font-normal leading-5 rounded-xl text-center"
            >
              <CustomLoader />
            </TableCell>
          </TableRow>
        ) : table?.getRowModel().rows?.length ? (
          <>
            {/* Render Top Pinned Rows */}
            {table.getTopRows().map((row, index) => (
              <TableRow
                key={row.id + index}
                className={cn(
                  "relative after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-full after:bg-mid-gray-400",
                  "pinned-row"
                )}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id + index}
                    className={cn(
                      "py-3 text-sm font-normal leading-5",
                      index === 0
                        ? "rounded-l-xl"
                        : index === row.getVisibleCells().length - 1
                        ? "rounded-r-xl"
                        : ""
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {/* Add Unpin Button */}
                    {index === 0 && (
                      <button onClick={() => row.pin(false)}>Unpin</button>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {/* Render Center Rows */}
            {table.getCenterRows().map((row, index) => (
              <TableRow
                key={row.id + index}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  "relative after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-full after:bg-mid-gray-400"
                )}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "py-3 text-sm font-normal leading-5",
                      index === 0
                        ? "rounded-l-xl"
                        : index === row.getVisibleCells().length - 1
                        ? "rounded-r-xl"
                        : ""
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {/* Add Pin Buttons */}
                    {/* {index === 0 && <button onClick={() => row.pin('top')}>Pin to Top</button>} */}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {/* Render Bottom Pinned Rows */}
            {table.getBottomRows().map((row, index) => (
              <TableRow
                key={row.id + index}
                className={cn(
                  "relative after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-full after:bg-mid-gray-400",
                  "pinned-row"
                )}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id + index}
                    className={cn(
                      "py-3 text-sm font-normal leading-5",
                      index === 0
                        ? "rounded-l-xl"
                        : index === row.getVisibleCells().length - 1
                        ? "rounded-r-xl"
                        : ""
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    {/* Add Unpin Button */}
                    {index === 0 && (
                      <button onClick={() => row.pin(false)}>Unpin</button>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </>
        ) : (
          <TableRow className="relative after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-full after:bg-mid-gray-400">
            <TableCell
              colSpan={columns.length}
              className="py-3 text-sm rounded-xl"
            >
              <div className="flex items-center gap-1 justify-center flex-col py-5">
                <Image
                  src={OrderEmptyState}
                  className="mx-auto mb-3"
                  width={74}
                  height={64}
                  alt="Order Empty State"
                />
                {emptyState?.title && (
                  <Text
                    variant="ps"
                    color="text-[#3F4254]"
                    fontWeight="semibold"
                  >
                    {emptyState?.title}
                  </Text>
                )}
                <Text
                  variant="pxs"
                  color="text-[#666666]"
                  fontWeight="semibold"
                >
                  {emptyState?.message ?? "No record found"}
                </Text>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export { CustomTable };
