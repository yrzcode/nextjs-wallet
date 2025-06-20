import type { Table } from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TablePagination = <TData,>({ table }: { table: Table<TData> }) => {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  // Calculate the range of page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // If total pages <= 7, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show the first page
      pages.push(1);

      // Calculate the middle range of page numbers to display
      let startPage: number;
      let endPage: number;

      if (currentPage <= 4) {
        // Current page is at the beginning, show 1 2 3 4 5 ... 10
        startPage = 2;
        endPage = 5;
      } else if (currentPage >= totalPages - 3) {
        // Current page is at the end, show 1 ... 6 7 8 9 10
        startPage = totalPages - 4;
        endPage = totalPages - 1;
      } else {
        // Current page is in the middle, show 1 ... 4 5 6 ... 10
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }

      // Add ellipsis if there's a gap between first page and start page
      if (startPage > 2) {
        pages.push("...");
      }

      // Add the middle page numbers
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if there's a gap between end page and last page
      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      // Always show the last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between py-4">
      <div className="text-sm text-muted-foreground whitespace-nowrap">
        Page {currentPage} of {totalPages} | Total{" "}
        {table.getFilteredRowModel().rows.length} records
      </div>

      <Pagination className="justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => table.previousPage()}
              className={
                !table.getCanPreviousPage()
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {pageNumbers.map((pageNum, index) =>
            pageNum === "..." ? (
              <PaginationItem
                key={`ellipsis-${pageNumbers[index - 1]}-${
                  pageNumbers[index + 1]
                }`}
              >
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  onClick={() => table.setPageIndex((pageNum as number) - 1)}
                  isActive={currentPage === pageNum}
                  className="cursor-pointer"
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              className={
                !table.getCanNextPage()
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

export default TablePagination;
