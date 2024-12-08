import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import AdminMenu from "../components/admin/AdminMenu";
import AdminPlantoesPendentes from "../components/admin/AdminPlantoesPendentes";

function Admin() {
  const [searchParams] = useSearchParams();

  const content = searchParams.get("content");

  return (
    <div className="flex-1 flex flex-col">
      {" "}
      <div className="hidden lg:block bg-primary-light p-8"></div>
      <div className="animate-top flex-1 flex flex-col lg:flex-row w-full lg:w-3/4 lg:mx-auto lg:gap-4">
        {content ? null : (
          <div className="flex-1 gap-4 lg:gap-0 lg:py-0 bg-white">
            <AdminMenu />
          </div>
        )}
        {content === "plantoes-pendentes" && <AdminPlantoesPendentes />}
      </div>
      <div className="hidden lg:block bg-primary-light p-8"></div>
    </div>
  );
}

Admin.propTypes = {
  sidebarOpen: PropTypes.any,
  setSidebarOpen: PropTypes.any,
};

export default Admin;
