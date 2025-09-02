import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type CustomPaginationProps = {
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  currentPage?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
};

const CustomPagination: React.FC<CustomPaginationProps> = ({
  handlePreviousPage,
  handleNextPage,
  currentPage = 1,
  totalPages = 1,
  hasNextPage = true,
  hasPreviousPage = true,
}) => {
  return (
    <div className='flex items-center justify-between py-4'>
      <div className='text-sm text-gray-500'>
        Page {currentPage} of {totalPages}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePreviousPage}
              className={
                !hasPreviousPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              className={
                !hasNextPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
