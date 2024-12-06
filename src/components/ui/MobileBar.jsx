import { useLocation } from "react-router-dom";
import {
  IoCalendarOutline,
  IoCalendarSharp,
  IoHomeOutline,
  IoHomeSharp,
  IoSettings,
  IoSettingsOutline,
} from "react-icons/io5";
import { FaRegUser, FaUser } from "react-icons/fa";
import MobileNavBarButton from "../app-layout/mobile-bar/MobileNavBarButton";
import MobileNavBarAddCaso from "../app-layout/mobile-bar/MobileNavBarAddCaso";

function MobileBar() {
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear().toString();

  const location = useLocation();

  return (
    <div className="lg:hidden fixed bottom-0 w-full text-xl bg-gray-200">
      <div className="relative flex items-center justify-between w-full ">
        <MobileNavBarButton path="/home">
          {location.pathname === "home" ? <IoHomeOutline /> : <IoHomeSharp />}
        </MobileNavBarButton>{" "}
        <MobileNavBarButton path="/perfil">
          {" "}
          {location.pathname === "/perfil" ? <FaRegUser /> : <FaUser />}
        </MobileNavBarButton>
        <MobileNavBarButton
          location="/calendario"
          path={`/calendario?mes=${month}&ano=${year}`}
        >
          {window.location.pathname === "/calendario" ? (
            <IoCalendarOutline />
          ) : (
            <IoCalendarSharp />
          )}
        </MobileNavBarButton>
        {location.pathname !== "/calendario" &&
        location.pathname !== "/novo-caso" ? (
          <MobileNavBarAddCaso />
        ) : null}
        <MobileNavBarButton path="/configuracoes">
          {" "}
          {location.pathname === "/configuracoes" ? (
            <IoSettingsOutline />
          ) : (
            <IoSettings />
          )}
        </MobileNavBarButton>
      </div>
    </div>
  );
}

export default MobileBar;
