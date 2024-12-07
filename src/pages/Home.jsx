import PropTypes from "prop-types";
import { useCalendarioFuturo } from "../services/useCalendario";
import PlantaoItem from "../components/home/PlantaoItem";
import Spinner from "../components/ui/Spinner";
import Pagination from "../components/ui/Pagination";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/values";
import Table from "../components/ui/Table";

const tableHeader = [
  { nome: "Data" },
  { nome: "Período" },
  { nome: "Hospital" },
  { nome: "Grupo" },
  { nome: "Status" },
];

function Home({ setSidebarOpen }) {
  const user_id = 1;
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    calendarData: data,
    isPending,
    count,
  } = useCalendarioFuturo(user_id, page);

  return (
    <div
      onClick={() => setSidebarOpen(false)}
      className="animate-top flex-1 w-full lg:flex lg:items-center lg:justify-center lg:mx-auto lg:w-3/4"
    >
      <div className="w-full max-w-full max-h-[500px] overflow-hidden lg:w-3/4 lg:-translate-y-20">
        {isPending ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : count === 0 ? (
          <div className="flex justify-center items-center font-bold text-white">
            Nenhum plantão pendente
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className=" flex flex-col items-center gap-8 w-full">
              <h1 className="text-center lg:text-start font-bold text-2xl lg:text-4xl text-white self-start w-full">
                Plantões pendentes ({count})
              </h1>
              <Table tableHeader={tableHeader} borderRounded={true}>
                {" "}
                {data?.map((shift) => (
                  <PlantaoItem key={shift.id} data={shift} />
                ))}
              </Table>
            </div>
            <div className="bg-white w-full">
              <Pagination pageSize={PAGE_SIZE} count={count} border={true} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Home.propTypes = {
  sidebarOpen: PropTypes.any,
  setSidebarOpen: PropTypes.any,
};

export default Home;
