'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { getPageNumbers } from '@/lib/pagination';

interface PostPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (_page: number) => void;
}

export default function PostPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PostPaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(totalPages, currentPage);

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          >
            <ChevronLeftIcon />
          </PaginationLink>
        </PaginationItem>

        {pageNumbers.map((pageNumber, index) => (
          <PaginationItem key={`page-${index}`}>
            {pageNumber === 'start-ellipsis' || pageNumber === 'end-ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => onPageChange(pageNumber)}
                isActive={currentPage === pageNumber}
                className="cursor-pointer"
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
            }
          >
            <ChevronRightIcon />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
