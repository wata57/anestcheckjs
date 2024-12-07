import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import TopBar from "../app-layout/top-bar/TopBar";
// import SideBar from "../app-layout/side-bar/SideBar";
import MobileBar from "../app-layout/mobile-bar/MobileBar";

function AppLayout({ setSidebarOpen, sidebarOpen }) {
  return (
    <div className="flex flex-col h-dvh">
      <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 relative w-full">
        {/* <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        <Outlet />
      </div>
      <MobileBar />
    </div>
  );
}

AppLayout.propTypes = {
  sidebarOpen: PropTypes.any,
  setSidebarOpen: PropTypes.any,
};

export default AppLayout;
