import PropTypes from "prop-types";
import CaldendarApp from "../components/calendario/CalendarApp";
import { useCalendario } from "../services/useCalendario";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Calendario({ setSidebarOpen }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = 1;
  const { data, isPending } = useCalendario(id);

  useEffect(() => {
    searchParams.delete("editar-evento");
    setSearchParams(searchParams);
  }, []);

  return (
    <div className="flex-1" onClick={() => setSidebarOpen(false)}>
      {isPending ? <p>Loading</p> : <CaldendarApp data={data} />}
    </div>
  );
}

Calendario.propTypes = {
  setSidebarOpen: PropTypes.any,
};

export default Calendario;
