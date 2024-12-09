import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { TiDelete } from "react-icons/ti";
import { useUsersAdmin } from "../../services/useAdmin";
import { removeAccents } from "../../utils/stringManipulation";
import { FaUserDoctor } from "react-icons/fa6";

function SelectMedico({ state, dispatch }) {
  const [medico, setMedico] = useState("");
  const { data: listaMedicos } = useUsersAdmin();
  const dropdownRef = useRef(null);
  const [filteredMedicos, setFilteredMedicos] = useState([]);
  const [selectedForDeletion, setSelectedForDeletion] = useState(null);

  const handleInputChange = (e) => {
    const inputValue = removeAccents(e.target.value);
    setMedico(inputValue);
  };

  const handleSelectOption = (selectedMedico) => {
    const isDuplicate = state.listaMedico?.some(
      (medication) => medication?.nome === selectedMedico?.nome
    );

    if (!isDuplicate) {
      const updatedSelectedMedicos = [...state.listaMedico, selectedMedico];
      dispatch({
        type: "SET_MEDICOS",
        payload: updatedSelectedMedicos,
      });
      sessionStorage.setItem("medicos", JSON.stringify(updatedSelectedMedicos));
    }

    setMedico("");
  };

  const handleDeleteMedication = (index) => {
    const updatedSelectedMedicos = state.listaMedico?.filter(
      (_, i) => i !== index
    );
    dispatch({ type: "SET_MEDICOS", payload: updatedSelectedMedicos });
    sessionStorage.setItem("medicos", JSON.stringify(updatedSelectedMedicos));
  };

  const toggleDeleteButton = (index) => {
    if (selectedForDeletion === index) {
      setSelectedForDeletion(null);
    } else {
      setSelectedForDeletion(index);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilteredMedicos([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (medico.trim().length < 3) {
      setFilteredMedicos([]);
    } else {
      const filtered = listaMedicos.data.filter((item) =>
        removeAccents(JSON.stringify(item).toLowerCase()).includes(
          removeAccents(medico.toLowerCase())
        )
      );

      const filteredWithoutSelected = filtered?.filter(
        (item) =>
          !state.listaMedico?.some(
            (medication) => medication?.nome === item?.nome
          )
      );

      setFilteredMedicos(filteredWithoutSelected.slice(0, 5));
    }
  }, [medico, listaMedicos, state.listaMedico]);

  return (
    <>
      <div className="w-full flex items-center justify-between gap-5 md:gap-10">
        <h1 className="font-semibold text-xl md:text-3xl text-primary-light"></h1>
      </div>
      <div
        className={`flex flex-col w-full rounded-3xl transition-all duration-1000 text-white ${
          state.listaMedico?.length === 0 ? "" : " "
        }`}
      >
        <div className="relative flex">
          <div
            className={`flex items-center w-full bg-primary-light ${
              state.listaMedico?.length > 0 || filteredMedicos.length > 0
                ? "rounded-t-3xl"
                : "rounded-3xl"
            }`}
          >
            <input
              type="text"
              placeholder="Procurar médico..."
              value={medico}
              onChange={handleInputChange}
              className={`md:text-xl flex-1 p-3 rounded-3xl font-bold transition-colors text-center duration-300 focus:outline-none md:text-center placeholder-white bg-primary-light ${
                state.listaMedico?.length > 0 || filteredMedicos.length > 0
                  ? "rounded-t-3xl"
                  : "rounded-3xl"
              }`}
            />

            <div className="px-4">
              <FaUserDoctor size={20} />
            </div>
          </div>
          {filteredMedicos.length > 0 && (
            <ul
              ref={dropdownRef}
              className={`absolute flex flex-col top-full left-0 w-full bg-dark-bg dark:text-white  z-10 overflow-hidden shadow-[0px_50px_50px_-15px_rgba(0,0,0,0.2)] ${
                state.listaMedico?.length > 0 || filteredMedicos.length > 0
                  ? "rounded-b-3xl"
                  : "rounded-3xl"
              }`}
            >
              {filteredMedicos?.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2 cursor-pointer p-2  text-lg md:text-xl justify-center items-center text-center font-bold bg-white text-primary-light"
                  onClick={() => handleSelectOption(item)}
                >
                  {item?.name}
                  <span className="text-sm italic">(CRM - {item?.crm})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {state.listaMedico?.length > 0 && (
          <div>
            <ul className="bg-primary-light text-white font-bold flex gap-4 flex-wrap px-4 pt-4 justify-center rounded-b-2xl pb-4">
              {state.listaMedico?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => toggleDeleteButton(index)}
                  className={`animate-top shadow-md   flex gap-1 items-center py-2 px-2 rounded-3xl  cursor-pointer ${
                    selectedForDeletion === index ? "text-base" : "md:text-lg"
                  }`}
                >
                  {item?.name}
                  {selectedForDeletion === index && (
                    <button
                      className="text-red-500 dark:text-white"
                      onClick={() => handleDeleteMedication(index)}
                    >
                      <TiDelete size={20} />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

SelectMedico.propTypes = {
  state: PropTypes.any,
  dispatch: PropTypes.any,
};

export default SelectMedico;
