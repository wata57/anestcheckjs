import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../components/ui/Spinner";
import { useUser } from "../services/useUser";
import { USER_ID } from "../utils/values";

function ProtectedRouteAdmin({ children }) {
  const navigate = useNavigate();
  const user_id = USER_ID;
  const { userData, isPending } = useUser(user_id);

  useEffect(() => {
    if (!isPending) {
      if (userData?.role.id !== 1) {
        navigate("/app/home");
      }
    }
  }, [navigate, userData, isPending]);

  return isPending ? (
    <div className="flex justify-center items-center">
      <Spinner />
    </div>
  ) : userData?.role.id === 1 ? (
    <>{children}</>
  ) : null;
}

ProtectedRouteAdmin.propTypes = {
  children: PropTypes.any,
};

export default ProtectedRouteAdmin;
