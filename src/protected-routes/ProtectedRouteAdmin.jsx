import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "../components/ui/Spinner";
import { useUser } from "../services/auth/useUser";

function ProtectedRouteAdmin({ children }) {
  const navigate = useNavigate();
  const { role, isPending } = useUser();

  useEffect(() => {
    if (!isPending) {
      if (role.id !== 1) {
        navigate("/app/home");
      }
    }
  }, [navigate, role, isPending]);

  return isPending ? (
    <div className="flex justify-center items-center">
      <Spinner />
    </div>
  ) : role.id === 1 ? (
    <>{children}</>
  ) : null;
}

ProtectedRouteAdmin.propTypes = {
  children: PropTypes.any,
};

export default ProtectedRouteAdmin;
