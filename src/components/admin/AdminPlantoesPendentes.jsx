import PropTypes from "prop-types";
import { FaChevronUp } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import Pagination from "../ui/Pagination";
import { PAGE_SIZE, USER_ID } from "../../utils/values";
import AdminPlantaoPendenteItem from "./AdminPlantaoPendenteItem";
import { useState } from "react";
// import { useUser } from "../../services/useUser";
import {
  useCalendarioAdmin,
  useConfirmarPlantao,
} from "../../services/useAdmin";
import toast from "react-hot-toast";

// const tableHeader = [
//   { nome: "" },
//   { nome: "Médico" },
//   { nome: "Data" },
//   { nome: "Hospital" },
// ];

function AdminPlantoesPendentes() {
  const user_id = USER_ID;
  // const { userData } = useUser(user_id);

  const [checkedRows, setCheckedRows] = useState([]);

  const { confirmarPlantao } = useConfirmarPlantao(user_id, checkedRows);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { calendarData: data, isPending, count } = useCalendarioAdmin(page);

  function handleClick() {
    searchParams.delete("content");
    setSearchParams(searchParams);
  }

  const handleSelectAll = () => {
    if (checkedRows.length === data?.length) {
      setCheckedRows([]); // Deselect all if all are already checked
    } else {
      const allIds = data?.map((shift) => shift.id);
      setCheckedRows(allIds); // Select all rows
    }
  };

  const handleCheckboxChange = (id) => {
    setCheckedRows((prev) => {
      const updatedCheckedRows = prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id];

      return updatedCheckedRows;
    });
  };

  function handleConfirmar() {
    if (checkedRows.length === 0) {
      toast.error("Selecionar pelo menos um plantão");
      return;
    }

    confirmarPlantao({ user_id, checkedRows });
    setCheckedRows([]);
  }

  return (
    <div className="flex-1 bg-white rounded-t-3xl lg:rounded-none overflow-x-hidden">
      <button
        onClick={handleClick}
        className="flex justify-between items-center bg-white w-full p-4 text-start font-bold rounded-t-3xl lg:rounded-none"
      >
        Plantões pendentes
        <FaChevronUp />
      </button>

      {isPending ? (
        <div className="flex justify-center items-center w-full rounded-t-3xl lg:rounded-none">
          <Spinner />
        </div>
      ) : count === 0 ? (
        <div className="animate-top bg-primary-light">
          <p className=" flex justify-center items-center font-bold text-black bg-white w-full py-8">
            Nenhum plantão pendente
          </p>
        </div>
      ) : (
        <div className="animate-top py-4 flex flex-col">
          <table className="w-full border-2 bg-white table-auto select-none border-none rounded-t-3xl">
            <thead className="bg-gray-100 text-sm lg:text-xl">
              <tr>
                <th className={``}>
                  {" "}
                  <button
                    onClick={handleSelectAll}
                    className="py-2 px-4 rounded"
                  >
                    {checkedRows.length === data?.length
                      ? "Desmarcar tudo"
                      : "Selecionar tudo"}
                  </button>
                </th>
                <th className={`px-1 py-2 `}>Médico</th>
                <th className={`px-1 py-2 `}>Data</th>
                <th className={`px-1 py-2 `}>Hospital</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((shift) => (
                <AdminPlantaoPendenteItem
                  checked={checkedRows.includes(shift.id)}
                  setIsChecked={() => handleCheckboxChange(shift.id)}
                  key={shift.id}
                  data={shift}
                />
              ))}
            </tbody>
          </table>

          <div className="bg-white">
            <Pagination
              pageSize={PAGE_SIZE}
              count={count}
              border={true}
              bg="bg-primary-light"
            />
          </div>

          <button
            className="px-4 py-2 bg-primary-light text-white font-bold rounded-full self-end m-4 text-sm lg:text-lg"
            onClick={handleConfirmar}
          >
            Confirmar
          </button>
        </div>
      )}
    </div>
  );
}

AdminPlantoesPendentes.propTypes = {
  children: PropTypes.any,
};

export default AdminPlantoesPendentes;
