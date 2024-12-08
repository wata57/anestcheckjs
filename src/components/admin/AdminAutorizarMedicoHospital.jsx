import PropTypes from "prop-types";
import { FaChevronUp } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

function AdminAutorizarMedicoHospital() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick() {
    searchParams.delete("content");
    setSearchParams(searchParams);
  }

  return (
    <div className="flex-1 bg-white rounded-t-3xl lg:rounded-none overflow-x-hidden">
      <button
        onClick={handleClick}
        className="flex justify-between items-center bg-white w-full p-4 text-start font-bold rounded-t-3xl lg:rounded-none"
      >
        Autorizar médicos
        <FaChevronUp />
      </button>

      <div className="animate-top py-4 flex flex-col">d</div>
    </div>
  );
}

AdminAutorizarMedicoHospital.propTypes = {
  children: PropTypes.any,
};

export default AdminAutorizarMedicoHospital;
