import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

function NavButton({ children, path, border }) {
  const location = useLocation();

  return (
    <Link
      to={path}
      className={` px-4 py-2 border-y rounded-sm border-gray-400 transition-colors duration-400 ${
        location.pathname === path ? "bg-primary-light text-white" : ""
      } ${border === "left" ? "border-l" : ""} ${
        border === "right" ? "border-r" : ""
      }`}
    >
      {children}
    </Link>
  );
}

NavButton.propTypes = {
  children: PropTypes.any,
  path: PropTypes.string,
  border: PropTypes.string,
};

export default NavButton;
