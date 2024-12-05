import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

function MobileNavBarButton({ children, path }) {
  const location = useLocation();
  console.log(location.pathname === path);
  return (
    <Link
      to={path}
      className={`flex items-center justify-center  flex-1 p-4 border-t-2 border-x rounded-sm border-gray-400 transition-colors duration-400 ${
        location.pathname === path
          ? "bg-primary-light text-white"
          : "bg-transparent text-black"
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
};

export default MobileNavBarButton;
