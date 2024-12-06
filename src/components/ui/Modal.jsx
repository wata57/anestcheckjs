import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import useOutsideClick from "../../hooks/useOutsideClick";
import { formatYearCalendar } from "../../utils/calendar";

function Modal({ children, onClick, title, date, type }) {
  const ref = useOutsideClick(onClick);
  let finalDate;

  if (date && type === "adicionar") {
    finalDate = formatYearCalendar(date);
  }

  return createPortal(
    <div className="animate-left fixed top-0 left-0 w-full h-dvh backdrop-blur-lg transition-all duration-500 z-[1000]">
      <div
        ref={ref}
        className="w-full py-4 px-6 lg:w-2/5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-1 shadow-2xl transition-all duration-500 rounded-2xl"
      >
        <div className="animate-left w-full items-center flex flex-col">
          <div className="w-full flex items-center justify-between gap-5 md:gap-10">
            <h1 className="font-semibold text-2xl md:text-3xl text-primary-light flex items-center gap-4">
              <span>{title}</span>

              {type === "adicionar" && (
                <span className="text-black">{finalDate}</span>
              )}
            </h1>

            <IoClose
              onClick={onClick}
              className="text-4xl cursor-pointer hover:-translate-y-1 transition-all duration-300"
            />
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  children: PropTypes.any,
  title: PropTypes.any,
  onClick: PropTypes.any,
  date: PropTypes.any,
};

export default Modal;
