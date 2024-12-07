import PropTypes from "prop-types";
import { formatYearCalendar } from "../../utils/calendar";
import { FaCircle } from "react-icons/fa";

function PerfilPlantaoItem({ data }) {
  return (
    <tr className="text-xs lg:text-base">
      <td className="p-4 text-center">
        {formatYearCalendar(data?.date.split("T")[0])}
      </td>
      <td className="p-4 text-center lg:whitespace-nowrap">{data?.event}</td>
      <td className="p-4 text-center lg:whitespace-nowrap">
        {data?.hospitals.hospital_name}
      </td>
      <td className="p-4 text-center">{data?.anesthesia_group_id}</td>
      <td className="hidden lg:block p-4">
        <div className="flex items-center justify-center gap-2">
          <FaCircle className={`lg:hidden text-red-500`} />
          <p
            className={`hidden lg:block font-bold px-2 py-1 rounded-full bg-red-200 text-red-900`}
          >
            Finalizado
          </p>
        </div>
      </td>
      <td className="block lg:hidden p-4">
        <div className="flex items-center justify-center gap-2 font-bold">
          OK
        </div>
      </td>
    </tr>
  );
}

PerfilPlantaoItem.propTypes = {
  data: PropTypes.any,
};

export default PerfilPlantaoItem;
