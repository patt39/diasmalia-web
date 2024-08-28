import { CardFooter } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

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
  paginate,
  isPlaceholderData,
  pageItem,
}) => {
  return (
    <>
      {data?.total_page > 1 ? (
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem
                onClick={() =>
                  setPageItem((old: number) => Math.max(old - 1, 1))
                }
                className="cursor-pointer"
              >
                <PaginationPrevious />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {pageItem}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem
                className={`cursor-pointer  ${
                  !isPlaceholderData &&
                  data?.data?.total_page === pageItem &&
                  'disabled'
                }`}
                onClick={() => {
                  if (
                    !isPlaceholderData &&
                    data?.data?.total_page !== pageItem
                  ) {
                    setPageItem((old: number) =>
                      data?.next_page ? old + 1 : old,
                    );
                    // paginate(pageItem + 1);
                  }
                }}
              >
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      ) : null}
    </>
  );
};
