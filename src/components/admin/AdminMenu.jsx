import PropTypes from "prop-types";
import AdminMenuBtn from "./AdminMenuBtn";

function AdminMenu({ menuOption, setMenuOption }) {
  return (
    <div className="flex-1 bg-white">
      <AdminMenuBtn
        params="plantoes-pendentes"
        setMenuOption={setMenuOption}
        menuOption={menuOption}
      >
        Plantões pendentes
      </AdminMenuBtn>
    </div>
  );
}

AdminMenu.propTypes = {
  menuOption: PropTypes.any,
  setMenuOption: PropTypes.any,
};

export default AdminMenu;