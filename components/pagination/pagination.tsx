import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPagination } from "@/utils/pagination";

type PropsType = {
  setCurrentPag: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalPage: number;
};

export default function Paginating({
  setCurrentPag,
  currentPage,
  totalPage,
}: PropsType) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className='hover:cursor-pointer'
            onClick={() => setCurrentPag(currentPage > 1 ? currentPage - 1 : 1)}
          />
        </PaginationItem>
        {getPagination(currentPage, totalPage).map((page, i) => (
          <PaginationItem key={i}>
            {typeof page === "number" ? (
              <PaginationLink
                className='hover:cursor-pointer'
                isActive={page === currentPage}
                onClick={() => setCurrentPag(page)}
              >
                {page ? page : "..."}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            className='hover:cursor-pointer'
            onClick={() =>
              setCurrentPag(
                totalPage < currentPage ? currentPage + 1 : totalPage,
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
