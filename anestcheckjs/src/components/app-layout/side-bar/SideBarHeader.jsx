import PropTypes from "prop-types";
import Logo from "../../ui/Logo";
import {
  BsLayoutSidebarInset,
  BsLayoutSidebarInsetReverse,
} from "react-icons/bs";

function SideBarHeader({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className="p-4 flex items-center gap-2">
      <div
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="cursor-pointer text-2xl"
      >
        {sidebarOpen ? (
          <BsLayoutSidebarInset />
        ) : (
          <BsLayoutSidebarInsetReverse />
        )}{" "}
      </div>
      <div
        className="cursor-pointer"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <Logo type="nav" /> : ""}
      </div>
    </div>
  );
}

SideBarHeader.propTypes = {
  sidebarOpen: PropTypes.any,
  setSidebarOpen: PropTypes.any,
};

export default SideBarHeader;
