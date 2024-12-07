import PropTypes from "prop-types";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

function Pagination({ count, pageSize, text }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const pageCount = Math.ceil(count / pageSize);

  function handlePageChange(event) {
    const selectedPage = Number(event.target.value);
    searchParams.set("page", selectedPage);
    setSearchParams(searchParams);
  }

  function nextPage() {
    if (currentPage < pageCount) {
      searchParams.set("page", currentPage + 1);
      setSearchParams(searchParams);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      searchParams.set("page", currentPage - 1);
      setSearchParams(searchParams);
    }
  }

  if (pageCount <= 1) return null;

  const pageOptions = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div
      className={`flex w-full text-xs md:text-sm justify-between select-none p-4 px-2 font-bold  ${text}`}
    >
      <button
        className={`flex items-center ${
          currentPage > 1 ? `${text}  cursor-pointer` : "text-transparent"
        }`}
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        <HiChevronLeft /> <span>Anterior</span>
      </button>
      <div className="flex items-center text-sm">
        <span className="mr-2">Página:</span>
        <select
          className={`bg-primary-light text-sm  rounded-full px-2 py-1 outline-none  transition-all duration-300 cursor-pointer text-white`}
          value={currentPage}
          onChange={handlePageChange}
        >
          {pageOptions.map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </select>
      </div>
      <button
        className={`flex items-center ${
          currentPage < pageCount
            ? `${text}  cursor-pointer`
            : "text-transparent"
        }`}
        onClick={nextPage}
        disabled={currentPage === pageCount}
      >
        <span>Próximo</span>
        <HiChevronRight />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  count: PropTypes.number,
  pageSize: PropTypes.number,
  text: PropTypes.string,
};

export default Pagination;
