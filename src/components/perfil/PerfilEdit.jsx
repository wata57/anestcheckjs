import PropTypes from "prop-types";
import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { useUser } from "../../services/auth/useUser";

function PerfilEdit({ setMenuOption }) {
  const [nome, setNome] = useState();
  const { name, email } = useUser();

  return (
    <div className="flex-1 bg-white rounded-t-3xl lg:rounded-none">
      {" "}
      <button
        onClick={() => setMenuOption(null)}
        className="rounded-3x flex justify-between items-center w-full p-4 text-start font-bold rounded-t-3xl"
      >
        Editar perfil
        <FaChevronUp />
      </button>
      <div className="animate-top flex flex-col gap-2 px-8 py-4">
        <div className="flex flex-col gap-1">
          <label className="font-bold">Nome</label>
          <input
            placeholder={name}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="outline-none placeholder:text-gray-400"
          />
        </div>{" "}
        <div className="flex flex-col gap-1">
          <label className="font-bold">E-mail</label>
          <input
            value={email}
            readOnly
            className="outline-none placeholder:text-gray-400"
          />
        </div>
      </div>
    </div>
  );
}

PerfilEdit.propTypes = {
  children: PropTypes.any,
  menuOption: PropTypes.any,
  setMenuOption: PropTypes.any,
  name: PropTypes.any,
  email: PropTypes.any,
};

export default PerfilEdit;
