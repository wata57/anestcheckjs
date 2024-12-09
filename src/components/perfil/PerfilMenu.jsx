import PropTypes from "prop-types";
import PerfilMenuBtn from "./PerfilMenuBtn";
import PerfilLogout from "./PerfilLogout";

function PerfilMenu({ menuOption, setMenuOption }) {
  return (
    <div className="flex-1 bg-white">
      <PerfilMenuBtn setMenuOption={setMenuOption} menuOption={menuOption}>
        Editar perfil
      </PerfilMenuBtn>
      <PerfilMenuBtn setMenuOption={setMenuOption} menuOption={menuOption}>
        Plantões realizados
      </PerfilMenuBtn>
      <PerfilMenuBtn setMenuOption={setMenuOption} menuOption={menuOption}>
        Hospitais autorizados
      </PerfilMenuBtn>
      <PerfilLogout>Sair</PerfilLogout>
    </div>
  );
}

PerfilMenu.propTypes = {
  menuOption: PropTypes.any,
  setMenuOption: PropTypes.any,
};

export default PerfilMenu;
