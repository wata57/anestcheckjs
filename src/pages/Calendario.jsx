import PropTypes from "prop-types";
import CaldendarApp from "../components/calendario/CalendarApp";
import { useCalendarioAll } from "../services/useCalendario";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import CalendarFilter from "../components/calendario/CalendarFilter";
import { useUser } from "../services/auth/useUser";

function Calendario({ setSidebarOpen }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const month = searchParams.get("mes");
  const year = searchParams.get("ano");

  const formattedDate = `${year}-${month}-01`;

  const { user_id } = useUser();
  const {
    calendarData: data,
    isPending,
    refetch,
  } = useCalendarioAll(user_id, month, year);
  useEffect(() => {
    searchParams.delete("editar-evento");
    setSearchParams(searchParams);
  }, []);

  return (
    <div
      className={`relative flex-1 ${
        isPending ? "flex justify-center items-center" : ""
      }`}
      onClick={() => setSidebarOpen(false)}
    >
      <CalendarFilter />
      {isPending ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="">
          <CaldendarApp data={data} today={formattedDate} refetch={refetch} />
        </div>
      )}
    </div>
  );
}

Calendario.propTypes = {
  setSidebarOpen: PropTypes.any,
};

export default Calendario;
