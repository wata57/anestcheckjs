import PropTypes from "prop-types";

// import {
//   BsLayoutSidebarInset,
//   BsLayoutSidebarInsetReverse,
// } from "react-icons/bs";
import Logo from "./Logo";
import TopBarButton from "../app-layout/top-bar/TopBarButton";
import { useLocation } from "react-router-dom";
import {
  IoCalendarOutline,
  IoCalendarSharp,
  IoHomeOutline,
  IoHomeSharp,
} from "react-icons/io5";
import { FaRegUser, FaRegUserCircle, FaUser } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

function TopBar({ sidebarOpen, setSidebarOpen }) {
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear().toString();

  const location = useLocation();
  const title =
    location.pathname === "/home"
      ? "Tela inicial"
      : location.pathname === "/perfil"
      ? "Perfil"
      : location.pathname === "/calendario"
      ? "Meus plantões"
      : location.pathname === "/configuracoes"
      ? "Configurações"
      : location.pathname === "/novo-caso"
      ? "Novo caso"
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
        <div className="flex items-center font-semibold select-none bg-white">
          <TopBarButton border="left" path="/home">
            {" "}
            {location.pathname === "home" ? <IoHomeOutline /> : <IoHomeSharp />}
            Tela inicial
          </TopBarButton>{" "}
          <TopBarButton path="/perfil">
            {location.pathname === "/perfil" ? <FaRegUser /> : <FaUser />}Perfil
          </TopBarButton>
          <TopBarButton
            location="/calendario"
            path={`/calendario?mes=${month}&ano=${year}`}
          >
            {location.pathname === "/calendario" ? (
              <IoCalendarOutline />
            ) : (
              <IoCalendarSharp />
            )}{" "}
            Meus plantões
          </TopBarButton>
          <TopBarButton path="/novo-caso">
            {location.pathname === "/novo" ? <MdAdd /> : <MdAdd />}
            Novo paciente
          </TopBarButton>
        </div>
        <div className="flex items-center gap-2 select-none">
          <FaRegUserCircle className="text-white text-2xl" />
          <p className="text-white font-bold">Felipe</p>
        </div>
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
