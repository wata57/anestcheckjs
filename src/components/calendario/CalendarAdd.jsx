import PropTypes from "prop-types";
import { useAddPlantao } from "../../services/useCalendario";
import { useState } from "react";
import toast from "react-hot-toast";
import Spinner2 from "../ui/Spinner2";
import { useUser } from "../../services/auth/useUser";
import { useNavigate } from "react-router-dom";

function CalendarAdd({ date, refetch }) {
  const [turno, setTurno] = useState("");
  const [hospital, setHospital] = useState("");
  const { user_id, hospitais_autorizados, isPeding: isPendingUser } = useUser();
  const { addUserPlantao, isPending } = useAddPlantao();
  const navigate = useNavigate();

  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear().toString();

  function handleClick() {
    if (!turno) {
      toast.error("Selecionar período");
      return;
    }

    if (!hospital) {
      toast.error("Selecionar hospital");
      return;
    }

    addUserPlantao({ user_id, date, turno, hospital });
    refetch();
    navigate(`/app/calendario?mes=${month}&ano=${year}`);
  }

  return (
    <div className="flex flex-col gap-8 w-full py-8">
      <select
        className={`rounded-xl font-semibold  focus:outline-none select-none custom-select`}
        value={turno}
        onChange={(e) => setTurno(e.target.value)}
      >
        <option value="">Selecionar período</option>
        <option value="diurno">Diurno</option>
        <option value="noturno">Noturno</option>
      </select>
      {isPendingUser ? (
        <div className="w-full flex items-center justify-center">
          <Spinner2 />
        </div>
      ) : (
        <select
          className={`rounded-xl font-semibold  focus:outline-none select-none custom-select`}
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
        >
          <option value="">Selecionar hospital</option>
          {hospitais_autorizados?.map((hospital) => (
            <option key={hospital.hospitals.id} value={hospital.hospitals.id}>
              {hospital.hospitals.hospital_name}
            </option>
          ))}
        </select>
      )}
      <button
        className="inline-flex items-center justify-center px-4 py-2 bg-green-700 text-white font-bold rounded-full"
        disabled={isPending}
        onClick={handleClick}
      >
        {" "}
        {isPending ? <Spinner2 /> : "Solicitar"}
      </button>
    </div>
  );
}

CalendarAdd.propTypes = {
  date: PropTypes.any,
  refetch: PropTypes.any,
};

export default CalendarAdd;
