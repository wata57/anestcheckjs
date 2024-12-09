import PropTypes from "prop-types";
import { useCalendarioFuturo } from "../services/useCalendario";
import PlantaoItem from "../components/home/PlantaoItem";
import Spinner from "../components/ui/Spinner";
import Pagination from "../components/ui/Pagination";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/values";
import Table from "../components/ui/Table";
import { useUser } from "../services/auth/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { HiRefresh } from "react-icons/hi";

const tableHeader = [
  { nome: "Data" },
  { nome: "Hospital" },
  { nome: "Grupo" },
  { nome: "Status" },
];

function Home({ setSidebarOpen }) {
  const { name, user_id, isPending: isPendingUserData } = useUser();
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const {
    calendarData: data,
    isPending,
    count,
  } = useCalendarioFuturo(user_id, page);

  const queryClient = useQueryClient();

  const handleRefetch = () => {
    queryClient.refetchQueries(["calendario-futuro", user_id, page], {
      exact: true,
    });
  };

  return (
    <div
      onClick={() => setSidebarOpen(false)}
      className="animate-top flex-1 w-full lg:flex lg:items-center lg:justify-center lg:mx-auto lg:w-3/4"
    >
      <div className="w-full max-w-full max-h-[500px]  lg:w-3/4 lg:-translate-y-20">
        {isPending || isPendingUserData ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : count === 0 ? (
          <div className="flex justify-center items-center font-bold text-white">
            Nenhum plantão pendente
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className=" flex flex-col items-center w-full gap-4">
              <h1 className="font-bold text-xl lg:text-2xl text-white self-start w-full px-4">
                Olá, {name}
              </h1>
              <div className="flex items-center justify-between w-full px-3">
                <p className="text-white">Plantões agendados ({count})</p>
                <button
                  onClick={handleRefetch}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md  flex items-center gap-2"
                >
                  Atualizar
                  <HiRefresh />
                </button>
              </div>
              <Table tableHeader={tableHeader} borderRounded={true}>
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
