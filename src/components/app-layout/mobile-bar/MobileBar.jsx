import { useLocation } from "react-router-dom";
import {
  IoCalendarOutline,
  IoCalendarSharp,
  IoHomeOutline,
  IoHomeSharp,
} from "react-icons/io5";
import { FaRegUser, FaUser } from "react-icons/fa";
import MobileNavBarButton from "./MobileNavBarButton";
import { useUser } from "../../../services/auth/useUser";
import { RiAdminFill, RiAdminLine } from "react-icons/ri";
// import MobileNavBarAddCaso from "./MobileNavBarAddCaso";

function MobileBar() {
  const { role } = useUser();

  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear().toString();

  const location = useLocation();

  return (
    <div className="lg:hidden fixed bottom-0 w-full text-xl bg-gray-200">
      <div className="relative flex items-center justify-between w-full ">
        <MobileNavBarButton location="/app/home" path="home">
          {location.pathname === "home" ? <IoHomeOutline /> : <IoHomeSharp />}
        </MobileNavBarButton>{" "}
        <MobileNavBarButton
          location="/app/calendario"
          path={`calendario?mes=${month}&ano=${year}`}
        >
          {window.location.pathname === "/calendario" ? (
            <IoCalendarOutline />
          ) : (
            <IoCalendarSharp />
          )}
        </MobileNavBarButton>{" "}
        {role.id === 1 ? (
          <MobileNavBarButton location="/app/admin" border="left" path="admin">
            {location.pathname === "/app/admin" ? (
              <RiAdminLine />
            ) : (
              <RiAdminFill />
            )}
          </MobileNavBarButton>
        ) : null}{" "}
        <MobileNavBarButton location="/app/perfil" path="perfil">
          {" "}
          {location.pathname === "/app/perfil" ? <FaRegUser /> : <FaUser />}
        </MobileNavBarButton>
        {/* {location.pathname !== "/calendario" &&
        location.pathname !== "/novo-caso" ? (
          <MobileNavBarAddCaso />
        ) : null} */}
      </div>
    </div>
  );
}

export default MobileBar;
