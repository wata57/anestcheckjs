import PropTypes from "prop-types";
import { FaChevronDown } from "react-icons/fa";

function PerfilMenuBtn({ children, setMenuOption }) {
  return (
    <button
      onClick={() => setMenuOption(children)}
      className="flex justify-between items-center w-full border-y p-4 text-start font-bold"
    >
      {children}
      <FaChevronDown />
    </button>
  );
}

PerfilMenuBtn.propTypes = {
  children: PropTypes.any,
  menuOption: PropTypes.any,
  setMenuOption: PropTypes.any,
};

export default PerfilMenuBtn;
