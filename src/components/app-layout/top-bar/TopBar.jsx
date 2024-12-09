import PropTypes from "prop-types";

// import {
//   BsLayoutSidebarInset,
//   BsLayoutSidebarInsetReverse,
// } from "react-icons/bs";
import Logo from "../../ui/Logo";
import TopBarButton from "./TopBarButton";
import { useLocation } from "react-router-dom";
import {
  // IoAddCircleOutline,
  IoCalendarOutline,
  IoCalendarSharp,
  IoHomeOutline,
  IoHomeSharp,
} from "react-icons/io5";
import { FaRegUser, FaUser } from "react-icons/fa";
import { useUser } from "../../../services/auth/useUser";
import { RiAdminFill, RiAdminLine } from "react-icons/ri";

function TopBar({ sidebarOpen, setSidebarOpen }) {
  const { role } = useUser();

  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear().toString();

  const location = useLocation();

  const title =
    location.pathname === "/home"
      ? "Tela inicial"
      : location.pathname === "/app/perfil"
      ? "Perfil"
      : location.pathname === "/app/calendario"
      ? "Meus plantões"
      : location.pathname === "/app/configuracoes"
      ? "Configurações"
      : location.pathname === "/app/novo-caso"
      ? "Novo caso"
      : location.pathname === "/app/admin"
      ? "Administrador"
      : null;
  return (
    <div className="flex items-center justify-between bg-primary-light w-full">
      <div className="p-4 flex gap-2 justify-start">
        <div
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="cursor-pointer text-2xl"
        >
          {/* {!sidebarOpen ? (
            <BsLayoutSidebarInset />
          ) : (
            <BsLayoutSidebarInsetReverse />
          )}{" "} */}
        </div>
        <div
          className="flex cursor-pointer w-full"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Logo />
        </div>
      </div>
      <div className="hidden p-4 lg:flex-1 lg:flex lg:items-center lg:justify-end w-full lg:gap-8 ">
        <div className="flex items-center font-semibold select-none bg-primary-light text-white">
          {role?.id === 1 ? (
            <TopBarButton location="/app/admin" border="left" path="admin">
              {location.pathname === "/app/admin" ? (
                <RiAdminFill />
              ) : (
                <RiAdminLine />
              )}
              Administrador
            </TopBarButton>
          ) : null}{" "}
          <TopBarButton location="/app/home" border="left" path="home">
            {location.pathname === "/app/home" ? (
              <IoHomeSharp />
            ) : (
              <IoHomeOutline />
            )}
            Tela inicial
          </TopBarButton>{" "}
          <TopBarButton
            location="/app/calendario"
            path={`/app/calendario?mes=${month}&ano=${year}`}
          >
            {location.pathname === "/app/calendario" ? (
              <IoCalendarSharp />
            ) : (
              <IoCalendarOutline />
            )}{" "}
            Meus plantões
          </TopBarButton>{" "}
          <TopBarButton location="/app/perfil" path="perfil">
            {location.pathname === "/app/perfil" ? <FaUser /> : <FaRegUser />}
            Perfil
          </TopBarButton>
          {/* <TopBarButton path="/novo-caso">
            {location.pathname === "/novo" ? (
              <IoAddCircleOutline className="text-2xl" />
            ) : (
              <IoAddCircleOutline className="text-2xl" />
            )}
            Novo paciente
          </TopBarButton> */}
        </div>
        {/* <div className="flex items-center gap-2 select-none">
          <FaRegUserCircle className="text-white text-2xl" />
          <p className="text-white font-bold">Felipe</p>
        </div> */}
      </div>
      <h2 className="lg:hidden font-bold p-4 text-white">{title}</h2>
    </div>
  );
}

TopBar.propTypes = {
  sidebarOpen: PropTypes.any,
  setSidebarOpen: PropTypes.any,
};

export default TopBar;
