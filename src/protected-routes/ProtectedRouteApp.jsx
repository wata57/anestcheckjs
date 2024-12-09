import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUser } from "../services/auth/useUser";
import { useEffect } from "react";
import Spinner from "../components/ui/Spinner";

function ProtectedRouteApp({ children }) {
  const navigate = useNavigate();

  const { isPending, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isPending) {
      if (!isAuthenticated) {
        navigate("/login");
      }
    }
  }, [isAuthenticated, isPending, navigate]);

  if (isPending)
    return (
      <div className="h-dhv mt-24  flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (isAuthenticated) return <>{children}</>;

  return null;
}

ProtectedRouteApp.propTypes = {
  children: PropTypes.any,
};

export default ProtectedRouteApp;
