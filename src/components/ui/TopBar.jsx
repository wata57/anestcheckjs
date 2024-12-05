import PropTypes from "prop-types";

import {
  BsLayoutSidebarInset,
  BsLayoutSidebarInsetReverse,
} from "react-icons/bs";
import Logo from "./Logo";
import TopBarButton from "../app-layout/top-bar/TopBarButton";
import { useLocation } from "react-router-dom";

function TopBar({ sidebarOpen, setSidebarOpen }) {
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
      : null;

  return (
    <div className="flex items-center justify-between bg-gray-200 w-full">
      <div className="p-4 flex gap-2 justify-start">
        <div
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="cursor-pointer text-2xl"
        >
          {!sidebarOpen ? (
            <BsLayoutSidebarInset />
          ) : (
            <BsLayoutSidebarInsetReverse />
          )}{" "}
        </div>
        <div
          className="flex cursor-pointer w-full"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Logo />
        </div>
      </div>
      <div className="hidden p-4 lg:flex-1 lg:flex lg:items-center lg:justify-end w-full lg:gap-2">
        <div className="flex items-center font-semibold select-none">
          <TopBarButton border="left" path="/home">
            Tela inicial
          </TopBarButton>
          <TopBarButton path="/perfil">Perfil</TopBarButton>
          <TopBarButton path="/calendario">Meus plantões</TopBarButton>
          <TopBarButton>Novo paciente</TopBarButton>
          <TopBarButton border="right">Sair</TopBarButton>
        </div>
      </div>
      <h2 className="lg:hidden font-bold p-4">{title}</h2>
    </div>
  );
}

TopBar.propTypes = {
  sidebarOpen: PropTypes.any,
  setSidebarOpen: PropTypes.any,
};

export default TopBar;
