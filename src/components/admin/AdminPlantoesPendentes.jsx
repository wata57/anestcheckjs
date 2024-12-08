import PropTypes from "prop-types";
import { FaChevronUp } from "react-icons/fa";
import { useCalendarioAdmin } from "../../services/useCalendario";
import { useSearchParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import Table from "../ui/Table";
import Pagination from "../ui/Pagination";
import { PAGE_SIZE, USER_ID } from "../../utils/values";
import AdminPlantaoPendenteItem from "./AdminPlantaoPendenteItem";
import { useState } from "react";
import { useUser } from "../../services/useUser";
import { useConfirmarPlantao } from "../../services/useAdmin";

const tableHeader = [
  { nome: "" },
  { nome: "Médico" },
  { nome: "Data" },
  { nome: "Hospital" },
];

function AdminPlantoesPendentes() {
  const user_id = USER_ID;
  const { userData } = useUser(user_id);
  const [checkedRows, setCheckedRows] = useState(() => {
    // Parse the session storage value, default to an empty array if null
    const saved = sessionStorage.getItem(
      `plantoes-autorizacao-checkbox-${userData?.id}`
    );
    return saved ? JSON.parse(saved) : [];
  });

  const { confirmarPlantao } = useConfirmarPlantao(user_id, checkedRows);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { calendarData: data, isPending, count } = useCalendarioAdmin(page);

  function handleClick() {
    searchParams.delete("content");
    setSearchParams(searchParams);
  }

  const handleCheckboxChange = (id) => {
    setCheckedRows((prev) => {
      const updatedCheckedRows = prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id];

      sessionStorage.setItem(
        `plantoes-autorizacao-checkbox-${userData?.id}`,
        JSON.stringify(updatedCheckedRows)
      );

      return updatedCheckedRows;
    });
  };

  function handleConfirmar() {
    confirmarPlantao({ user_id, checkedRows });
    setCheckedRows([]);
    sessionStorage.removeItem(`plantoes-autorizacao-checkbox-${userData?.id}`);
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
            Nenhum plantão realizado
          </p>
        </div>
      ) : (
        <div className="animate-top py-4">
          <Table tableHeader={tableHeader}>
            {data?.map((shift) => (
              <AdminPlantaoPendenteItem
                checked={checkedRows.includes(shift.id)}
                setIsChecked={() => handleCheckboxChange(shift.id)}
                key={shift.id}
                data={shift}
              />
            ))}
          </Table>
          <div className="bg-white">
            <Pagination
              pageSize={PAGE_SIZE}
              count={count}
              border={true}
              bg="bg-primary-light"
            />
          </div>
          {checkedRows.length > 0 && (
            <button onClick={handleConfirmar}>Confirmar</button>
          )}
        </div>
      )}
    </div>
  );
}

AdminPlantoesPendentes.propTypes = {
  children: PropTypes.any,
};

export default AdminPlantoesPendentes;
