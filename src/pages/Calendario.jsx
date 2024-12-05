import PropTypes from "prop-types";
import CaldendarApp from "../components/calendario/CalendarApp";

function Calendario({ setSidebarOpen }) {
  return (
    <div className="flex-1" onClick={() => setSidebarOpen(false)}>
      <CaldendarApp />
    </div>
  );
}

Calendario.propTypes = {
  setSidebarOpen: PropTypes.any,
};

export default Calendario;
