import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";

function MobileNavBarAddCaso() {
  return (
    <Link
      to="/novo-caso"
      className="absolute -top-1/2 left-1/2 -translate-x-1/2 p-2 rounded-full border-2 border-white text-4xl z-[1000] bg-blue-600 text-white cursor-pointer"
    >
      <MdAdd />
    </Link>
  );
}

export default MobileNavBarAddCaso;
