import PropTypes from "prop-types";
import { useCalendario } from "../services/useCalendario";
import PlantaoItem from "../components/home/PlantaoItem";
import Spinner from "../components/ui/Spinner";
import Pagination from "../components/ui/Pagination";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/values";

function Home({ setSidebarOpen }) {
  const id = 1;
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { calendarData: data, isPending, count } = useCalendario(id, page);

  return (
    <div
      onClick={() => setSidebarOpen(false)}
      className="flex-1 w-full lg:flex lg:items-center lg:justify-center lg:mx-auto lg:w-3/4"
    >
      <div className="w-full max-w-full max-h-[500px] overflow-hidden lg:w-3/4">
        {isPending ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <table className="w-full border-2 lg:rounded-3xl bg-white table-auto select-none">
              <thead className="bg-gray-100 text-sm lg:text-xl">
                <tr>
                  <th className="px-1 py-2 lg:rounded-tl-3xl ">Data</th>
                  <th className="px-1 py-2 ">Turno</th>
                  <th className="px-1 py-2 ">Hospital</th>
                  <th className="px-1 py-2 ">Grupo</th>
                  <th className="px-1 py-2 lg:rounded-tr-3xl ">Status</th>
                </tr>
              </thead>

              <tbody>
                {data?.map((shift) => (
                  <PlantaoItem key={shift.id} data={shift} />
                ))}
              </tbody>
            </table>
            <Pagination pageSize={PAGE_SIZE} count={count} border={true} />
          </>
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
