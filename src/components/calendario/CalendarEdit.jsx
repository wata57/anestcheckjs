import PropTypes from "prop-types";
import { FaCircle } from "react-icons/fa";
import { useDeletePlantao } from "../../services/useCalendario";
import { formatYearCalendar } from "../../utils/calendar";

function CalendarEdit({ data }) {
  const id = data.id;
  const user_id = 1;
  const { deleteUserPlantao, isPending } = useDeletePlantao();

  function handleClick() {
    deleteUserPlantao({ user_id, id });
  }

  const date = formatYearCalendar(data?.start);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="w-full flex items-center justify-around pt-4">
        <strong>{data?.location}</strong>
        <strong>{date}</strong>
      </div>
      <strong className="text-center">{data?.title}</strong>
      <div className="flex items-center justify-center gap-1">
        <FaCircle
          className={`${
            data?.validated ? "text-green-500" : "text-yellow-500"
          }`}
        />
        <p>{data?.validated ? "Confirmado" : "Aguardando confirmação"}</p>
      </div>

      {!data?.validated && (
        <button
          className="inline-flex items-center justify-center px-4 py-2 bg-red-700 text-white font-bold rounded-full"
          disabled={isPending}
          onClick={handleClick}
        >
          {" "}
          {isPending ? "Carregando" : "Cancelar requisição"}
        </button>
      )}
    </div>
  );
}

CalendarEdit.propTypes = {
  data: PropTypes.any,
};

export default CalendarEdit;