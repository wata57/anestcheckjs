import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import Modal from "../ui/Modal";

function CalendarModalEdit({ children, title, setSelectedEvent, date, type }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get("editar-evento");

  function handleClick() {
    searchParams.delete("editar-evento");
    setSelectedEvent(null);
    setSearchParams(searchParams);
  }

  return (
    <>
      {param === "verdade" && (
        <Modal type={type} date={date} title={title} onClick={handleClick}>
          {children}
        </Modal>
      )}
    </>
  );
}
CalendarModalEdit.propTypes = {
  children: PropTypes.any,
  setSelectedEvent: PropTypes.any,
  type: PropTypes.any,
  subTitle: PropTypes.string,
  modalType: PropTypes.string,
  date: PropTypes.any,
  title: PropTypes.any,
};

export default CalendarModalEdit;
