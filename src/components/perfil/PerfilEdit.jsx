import PropTypes from "prop-types";
import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";

function PerfilEdit({ setMenuOption, data }) {
  const [nome, setNome] = useState();

  return (
    <div className="flex-1 bg-white rounded-t-3xl">
      {" "}
      <button
        onClick={() => setMenuOption(null)}
        className="rounded-3x flex justify-between items-center w-full p-4 text-start font-bold rounded-t-3xl"
      >
        Editar perfil
        <FaChevronUp />
      </button>
      <div className="animate-top flex flex-col gap-2 p-8">
        <div className="flex flex-col gap-1">
          <label className="font-bold">Nome</label>
          <input
            placeholder={data?.nome}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="outline-none placeholder:text-gray-400"
          />
        </div>{" "}
        <div className="flex flex-col gap-1">
          <label className="font-bold">E-mail</label>
          <input
            value={data?.email}
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
  data: PropTypes.any,
};

export default PerfilEdit;
