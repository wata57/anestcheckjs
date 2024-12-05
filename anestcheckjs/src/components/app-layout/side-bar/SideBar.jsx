import PropTypes from "prop-types";
import SideBarContent from "./SideBarContent";
import SideBarFooter from "./SideBarFooter";

function SideBar({ sidebarOpen }) {
  return (
    <nav
      className={`bg-gray-200 absolute z-[1000] transition-all h-full duration-300 flex flex-col items-center justify-between  ${
        sidebarOpen ? "w-1/2 md:w-1/4" : "w-0"
      }`}
    >
      {sidebarOpen ? (
        <>
          <SideBarContent />
          <SideBarFooter />
        </>
      ) : null}
    </nav>
  );
}

SideBar.propTypes = {
  sidebarOpen: PropTypes.any,
  setSidebarOpen: PropTypes.any,
};

export default SideBar;
