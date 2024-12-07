import { useState } from "react";
import PerfilMenu from "../components/perfil/PerfilMenu";
import PerfilEdit from "../components/perfil/PerfilEdit";
import PerfilPlantoes from "../components/perfil/PerfilPlantoes";
import PerfilHospitais from "../components/perfil/PerfilHospitais";

const user = {
  nome: "Felipe de Andrade Watai",
  email: "felipe.watai@gmail.com",
  crm: "SP - 182779",
  role: "Anestesiologista",
  hospitais: {
    0: {
      nome: "Clínicas (HCFMUSP)",
    },
    1: {
      nome: "Albert Einstein",
    },
    2: {
      nome: "Servidor Público Estadual",
    },
  },
};

function Perfil() {
  const [menuOption, setMenuOption] = useState("menu");

  return (
    <div className="flex-1 flex flex-col">
      {" "}
      <div className="hidden lg:block bg-primary-light p-8"></div>
      <div className="animate-top flex-1 flex flex-col lg:flex-row w-full lg:w-3/4 lg:mx-auto ">
        {(menuOption === "menu" || !menuOption) && (
          <>
            <div className="lg:flex-1 flex flex-col items-center lg:justify-center gap-4 lg:gap-0 py-4 lg:py-0">
              <img
                className="rounded-full max-w-[50px] sm:max-w-[100px] lg:max-w-[250px] lg:-translate-y-24"
                src="/public/images/placeholder.png"
              />{" "}
              <div className="text-white  text-center lg:-translate-y-20">
                <h1 className="font-bold text-lg lg:text-3xl">{user.nome}</h1>
                <div className="flex items-center justify-center gap-2 text-base lg:text-xl">
                  <p>{user.role}</p>
                  <p>CRM {user.crm}</p>
                </div>
              </div>
            </div>
            <PerfilMenu setMenuOption={setMenuOption} menuOption={menuOption} />
          </>
        )}
        {menuOption === "Editar perfil" && (
          <PerfilEdit
            data={user}
            setMenuOption={setMenuOption}
            menuOption={menuOption}
          />
        )}
        {menuOption === "Plantões realizados" && (
          <PerfilPlantoes
            setMenuOption={setMenuOption}
            menuOption={menuOption}
          />
        )}
        {menuOption === "Hospitais autorizados" && (
          <PerfilHospitais
            data={user}
            setMenuOption={setMenuOption}
            menuOption={menuOption}
          />
        )}
      </div>
      <div className="hidden lg:block bg-primary-light p-8"></div>
    </div>
  );
}

export default Perfil;
