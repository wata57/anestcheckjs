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
        <MobileNavBarButton path="/calendario">
          {location.pathname === "/calendario" ? (
            <IoCalendarOutline />
          ) : (
            <IoCalendarSharp />
          )}
        </MobileNavBarButton>
        {location.pathname !== "/calendario" ? <MobileNavBarAddCaso /> : null}
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
