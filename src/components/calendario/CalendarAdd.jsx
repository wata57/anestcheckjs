import PropTypes from "prop-types";
import { useAddPlantao } from "../../services/useCalendario";
import { useState } from "react";

function CalendarAdd({ date }) {
  const [turno, setTurno] = useState("diurno");
  const id = 1;
  const { addUserPlantao, isPending } = useAddPlantao();

  function handleClick() {
    addUserPlantao({ id, date, turno });
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="w-full flex items-center justify-between pt-4">
        <p>{date}</p>
      </div>
      <select
        className={`rounded-xl font-semibold  focus:outline-none select-none custom-select`}
        value={turno}
        onChange={(e) => setTurno(e.target.value)}
      >
        <option value="diurno">Diurno</option>
        <option value="noturno">Noturno</option>
      </select>

      <button disabled={isPending} onClick={handleClick}>
        {isPending ? "Carregando" : "Solicitar"}
      </button>
    </div>
  );
}

CalendarAdd.propTypes = {
  date: PropTypes.any,
};

export default CalendarAdd;
