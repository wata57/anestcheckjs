import { useState } from "react";
import PerfilMenu from "../components/perfil/PerfilMenu";
import PerfilEdit from "../components/perfil/PerfilEdit";
import PerfilPlantoes from "../components/perfil/PerfilPlantoes";
import { useUser } from "../services/auth/useUser";
import PerfilHospitais from "../components/perfil/PerfilHospitais";
import Spinner from "../components/ui/Spinner";

function Perfil() {
  const { role, name, crm, isPending: isPendingUserData } = useUser();
  const [menuOption, setMenuOption] = useState("menu");

  return (
    <div className="flex-1 flex flex-col">
      {" "}
      <div className="hidden lg:block bg-primary-light p-8"></div>
      {isPendingUserData ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="animate-top flex-1 flex flex-col lg:flex-row w-full lg:w-3/4 lg:mx-auto lg:gap-4">
          {(menuOption === "menu" || !menuOption) && (
            <div className="lg:hidden lg:flex-1 flex flex-col items-center lg:justify-center gap-4 lg:gap-0 py-4 lg:py-0">
              <img
                className="rounded-full max-w-[50px] sm:max-w-[100px] lg:max-w-[250px] lg:-translate-y-24"
                src="/images/placeholder.png"
              />{" "}
              <div className="text-white  text-center lg:-translate-y-20">
                <h1 className="font-bold text-lg lg:text-3xl">{name}</h1>
                <div className="flex items-center justify-center gap-2 text-base lg:text-3xl">
                  <p>{role.role_name}</p>
                  <p>CRM {crm}</p>
                </div>
              </div>
            </div>
          )}
          <div className="hidden flex-1 lg:flex flex-col items-center lg:justify-center gap-4 lg:gap-0 py-4 lg:py-0">
            <img
              className="rounded-full max-w-[50px] sm:max-w-[100px] lg:max-w-[250px] lg:-translate-y-24"
              src="/images/placeholder.png"
            />{" "}
            <div className="text-white  text-center lg:whitespace-nowrap lg:-translate-y-20">
              <h1 className="font-bold text-lg lg:text-3xl">{name}</h1>
              <div className="flex items-center justify-center gap-2 text-base lg:text-xl">
                <p>{role.role_name}</p>
                <p>CRM {crm}</p>
              </div>
            </div>
          </div>
          {(menuOption === "menu" || !menuOption) && (
            <PerfilMenu setMenuOption={setMenuOption} menuOption={menuOption} />
          )}
          {menuOption === "Editar perfil" && (
            <PerfilEdit setMenuOption={setMenuOption} menuOption={menuOption} />
          )}
          {menuOption === "Plantões realizados" && (
            <PerfilPlantoes
              setMenuOption={setMenuOption}
              menuOption={menuOption}
            />
          )}
          {menuOption === "Hospitais autorizados" && (
            <PerfilHospitais
              setMenuOption={setMenuOption}
              menuOption={menuOption}
            />
          )}
        </div>
      )}
      <div className="hidden lg:block bg-primary-light p-8"></div>
    </div>
  );
}

export default Perfil;
