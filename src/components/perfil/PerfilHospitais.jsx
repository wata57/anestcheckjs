import PropTypes from "prop-types";
import { FaChevronUp } from "react-icons/fa";

function PerfilHospitais({ setMenuOption, data }) {
  return (
    <div className="flex-1 bg-white rounded-t-3xl">
      <button
        onClick={() => setMenuOption(null)}
        className="rounded-3x flex justify-between items-center w-full p-4 text-start font-bold rounded-t-3xl"
      >
        Hospitais autorizados
        <FaChevronUp />
      </button>
      <ol className="animate-top flex flex-col gap-2 p-8 list-decimal font-bold">
        {Object.values(data.hospitais).map((item) => (
          <li key={item.nome}>{item.nome}</li>
        ))}
      </ol>
    </div>
  );
}

PerfilHospitais.propTypes = {
  setMenuOption: PropTypes.func.isRequired,
  data: PropTypes.shape({
    hospitais: PropTypes.objectOf(
      PropTypes.shape({
        nome: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default PerfilHospitais;
