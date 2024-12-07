import PropTypes from "prop-types";
import { FaChevronUp } from "react-icons/fa";
import Table from "../ui/Table";
import { useSearchParams } from "react-router-dom";
import Spinner from "../ui/Spinner";
import Pagination from "../ui/Pagination";
import { PAGE_SIZE } from "../../utils/values";
import PerfilPlantaoItem from "./PerfilPlantaoItem";
import { useCalendarioPassado } from "../../services/useCalendario";

const tableHeader = [
  { nome: "Data" },
  { nome: "Período" },
  { nome: "Hospital" },
  { nome: "Grupo" },
  { nome: "Status" },
];

function PerfilPlantoes({ setMenuOption }) {
  const user_id = 1;
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    calendarData: data,
    isPending,
    count,
  } = useCalendarioPassado(user_id, page);

  return isPending ? (
    <div className="flex justify-center items-center w-full rounded-t-3xl">
      <Spinner />
    </div>
  ) : (
    <div className="bg-white w-full rounded-t-3xl">
      <button
        onClick={() => setMenuOption(null)}
        className=" rounded-t-3xl flex justify-between items-center bg-white w-full  p-4 text-start font-bold"
      >
        Plantões realizados
        <FaChevronUp />
      </button>
      {count === 0 ? (
        <div className="animate-top bg-primary-light">
          <p className=" flex justify-center items-center font-bold text-black bg-white w-full py-8">
            Nenhum plantão realizado
          </p>
        </div>
      ) : (
        <div className="animate-top ">
          <Table tableHeader={tableHeader}>
            {data?.map((shift) => (
              <PerfilPlantaoItem key={shift.id} data={shift} />
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
        </div>
      )}
    </div>
  );
}

PerfilPlantoes.propTypes = {
  children: PropTypes.any,
  menuOption: PropTypes.any,
  setMenuOption: PropTypes.any,
};

export default PerfilPlantoes;
