import PropTypes from "prop-types";
import CaldendarApp from "../components/calendario/CalendarApp";
import { useCalendario } from "../services/useCalendario";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";

function Calendario({ setSidebarOpen }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = 1;
  const { calendarData: data, isPending } = useCalendario(id);

  useEffect(() => {
    searchParams.delete("editar-evento");
    setSearchParams(searchParams);
  }, []);

  return (
    <div
      className={`flex-1 ${
        isPending ? "flex justify-center items-center" : ""
      }`}
      onClick={() => setSidebarOpen(false)}
    >
      {isPending ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <CaldendarApp data={data} />
      )}
    </div>
  );
}

Calendario.propTypes = {
  setSidebarOpen: PropTypes.any,
};

export default Calendario;
