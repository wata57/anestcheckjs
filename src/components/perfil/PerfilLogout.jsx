import PropTypes from "prop-types";
import { useState } from "react";
import { useLogout } from "../../services/auth/useUser";
import Spinner from "../ui/Spinner";
import Modal from "../ui/Modal";

function PerfilLogout({ children }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { logout, isPending } = useLogout();

  function handleClick() {
    setIsOpenModal((prev) => !prev);
  }

  function handleClose() {
    setIsOpenModal(false);
  }

  function handleLogout() {
    logout();
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="flex justify-between items-center w-full border-y p-4 text-start font-bold"
      >
        {children}
      </button>
      {isOpenModal && (
        <Modal type="confirmar" title="Deseja Encerrar?" onClose={handleClose}>
          <div className="flex w-full justify-around pt-8 pb-2">
            <button
              className="text-sm md:text-2xl inline-block bg-red-500 text-white px-8 py-3 rounded-full lg:hover:text-dark-bg font-bold transition-colors duration-300"
              onClick={handleLogout}
            >
              {isPending ? <Spinner /> : "Sim"}
            </button>
            <button
              className="text-md md:text-2xl lg:hover:-translate-y-1 lg:active:translate-y-1 px-6 py-3 font-bold transition-all duration-300 text-gray-950"
              onClick={handleClick}
            >
              Não
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

PerfilLogout.propTypes = {
  children: PropTypes.any,
  type: PropTypes.string,
  title: PropTypes.string,
};

export default PerfilLogout;
