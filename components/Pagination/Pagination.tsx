import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
}

export default function Pagination({
  pageCount,
  onPageChange,
  currentPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      containerClassName={css.pagination}
      pageLinkClassName={css.pageItem}
      activeLinkClassName={css.active}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      pageCount={pageCount}
      forcePage={Math.max(0, currentPage - 1)}
      onPageChange={onPageChange}
      renderOnZeroPageCount={null}
    />
  );
}
