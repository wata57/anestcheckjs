import PropTypes from "prop-types";
import { FaChevronUp } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import SelectMedico from "./SelectMedico";
import { useReducer } from "react";
import { useUser } from "../../services/auth/useUser";

function AdminAutorizarMedicoHospital() {
  const { hospitais_admin } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialState = {
    listaMedico: JSON.parse(sessionStorage.getItem("medicos")) || [],
  };

  console.log(hospitais_admin);

  function reducer(state, action) {
    switch (action.type) {
      case "SET_MEDICOS":
        return { ...state, listaMedico: action.payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  function handleClick() {
    searchParams.delete("content");
    setSearchParams(searchParams);
  }

  return (
    <div className="flex-1 bg-white rounded-t-3xl lg:rounded-none overflow-x-hidden">
      <button
        onClick={handleClick}
        className="flex justify-between items-center bg-white w-full p-4 text-start font-bold rounded-t-3xl lg:rounded-none"
      >
        Autorizar médicos
        <FaChevronUp />
      </button>

      <div className="animate-top p-4 flex flex-col">
        <SelectMedico state={state} dispatch={dispatch} />
        <h2 className="p-4 font-bold text-center">Hospitais administrados</h2>
        <ul>
          {hospitais_admin?.map((item) => (
            <li key={item.id}>{item.hospitals.hospital_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

AdminAutorizarMedicoHospital.propTypes = {
  children: PropTypes.any,
};

export default AdminAutorizarMedicoHospital;
