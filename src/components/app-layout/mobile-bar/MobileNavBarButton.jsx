import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function MobileNavBarButton({ children, path, location }) {
  return (
    <Link
      to={path}
      className={`flex items-center justify-center  flex-1 p-4 border-t-2 border-x rounded-sm border-gray-400 transition-colors duration-400 ${
        location
          ? window.location.pathname === location
            ? "bg-primary-light text-white"
            : ""
          : window.location.pathname === path
          ? "bg-primary-light text-white"
          : ""
      }`}
    >
      {children}
    </Link>
  );
}

MobileNavBarButton.propTypes = {
  children: PropTypes.any,
  path: PropTypes.string,
  border: PropTypes.string,
  location: PropTypes.string,
};

export default MobileNavBarButton;
