import { CardFooter } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export type SortModel = 'asc' | 'desc';

export type IsPaginate = 'TRUE' | 'FALSE';

export type PaymentType = 'CARD' | 'PAYPAL' | 'PHONE' | 'IBAN';

export type PaginationRequest = {
  organizationId?: string;
  isPaginate?: IsPaginate;
  search?: string;
  sort: SortModel;
  page?: number;
  take?: number;
  sortBy?: string;
};

export type PaginationResponse = {
  total: number;
  per_page: number;
  current_page: number;
  next_page: number;
  last_page: number;
  skip: number;
  sort: SortModel;
  total_page: number;
  total_value: number;
};

interface Props {
  data: any;
  setPageItem: any;
  paginate?: any;
  isPlaceholderData?: any;
  pageItem: number;
}

export const PaginationPage: React.FC<Props> = ({
  data,
  setPageItem,
  pageItem: page,
  isPlaceholderData,
}) => {
  const totalPageCount = data?.total_page;

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={page === i}
              className="cursor-pointer"
              onClick={() => setPageItem(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={page === 1}
            className="cursor-pointer"
            onClick={() => setPageItem(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>,
      );

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={page === i}
              className="cursor-pointer"
              onClick={() => setPageItem(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (page < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      items.push(
        <PaginationItem key={totalPageCount}>
          <PaginationLink
            className="cursor-pointer"
            isActive={page === totalPageCount}
            onClick={() => setPageItem(totalPageCount)}
          >
            {totalPageCount}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <>
      {data?.total_page > 1 ? (
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  aria-disabled={page === 1}
                  tabIndex={page === 1 ? -1 : undefined}
                  onClick={() =>
                    setPageItem((old: number) => Math.max(old - 1, 1))
                  }
                  className={cn(
                    `cursor-pointer  ${
                      page === 1 ? 'pointer-events-none opacity-50' : undefined
                    }`,
                  )}
                />
              </PaginationItem>
              {renderPageNumbers()}
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (!isPlaceholderData && data?.total_page !== page) {
                      setPageItem((old: number) =>
                        data?.next_page ? old + 1 : old,
                      );
                    }
                  }}
                  aria-disabled={page === totalPageCount}
                  tabIndex={page === totalPageCount ? -1 : undefined}
                  className={cn(
                    `cursor-pointer  ${
                      !isPlaceholderData &&
                      page === totalPageCount &&
                      data?.total_page === page
                        ? 'pointer-events-none opacity-50'
                        : undefined
                    }`,
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      ) : null}
    </>
  );
};
