import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function TopBarButton({ children, path, location }) {
  return (
    <Link
      to={path}
      className={`flex items-center gap-2 px-4 py-2  transition-colors duration-400 ${
        location
          ? window.location.pathname === location
            ? "bg-primary-light text-white"
            : ""
          : window.location.pathname === path
          ? "bg-primary-light text-white"
          : ""
      } `}
    >
      {children}
    </Link>
  );
}

TopBarButton.propTypes = {
  children: PropTypes.any,
  path: PropTypes.string,
  border: PropTypes.string,
  location: PropTypes.string,
};

export default TopBarButton;
