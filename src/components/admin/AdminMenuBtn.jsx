import PropTypes from "prop-types";
import { FaChevronDown } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

function AdminMenuBtn({ children, params }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick() {
    searchParams.set("content", params);
    setSearchParams(searchParams);
  }

  return (
    <button
      onClick={handleClick}
      className="flex justify-between items-center w-full border-y p-4 text-start font-bold"
    >
      {children}
      <FaChevronDown />
    </button>
  );
}

AdminMenuBtn.propTypes = {
  children: PropTypes.any,
  params: PropTypes.string,
};

export default AdminMenuBtn;
