import PropTypes from "prop-types";
import { FaChevronUp } from "react-icons/fa";
import { useUser } from "../../services/auth/useUser";

function PerfilHospitais({ setMenuOption }) {
  const { hospitais_autorizados } = useUser();

  return (
    <div className="flex-1 bg-white rounded-t-3xl lg:rounded-none">
      <button
        onClick={() => setMenuOption(null)}
        className="rounded-3x flex justify-between items-center w-full p-4 text-start font-bold rounded-t-3xl"
      >
        Hospitais autorizados
        <FaChevronUp />
      </button>
      <ol className="animate-top flex flex-col gap-2 px-8 py-4 list-decimal font-bold">
        {hospitais_autorizados?.map((item, i) => (
          <li key={i}>{item.hospitals.hospital_name}</li>
        ))}
      </ol>
    </div>
  );
}

PerfilHospitais.propTypes = {
  setMenuOption: PropTypes.func.isRequired,
};

export default PerfilHospitais;
