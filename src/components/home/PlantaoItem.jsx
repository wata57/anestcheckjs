import PropTypes from "prop-types";
import { formatYearCalendar } from "../../utils/calendar";
import { FaCircle } from "react-icons/fa";

function PlantaoItem({ data }) {
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
      <td className="p-4">
        <div className="flex items-center justify-center gap-2">
          <FaCircle
            className={`lg:hidden ${
              data?.validated ? "text-green-500" : "text-yellow-500"
            }`}
          />
          <p
            className={`hidden lg:block font-bold px-2 py-1 rounded-full ${
              data?.validated
                ? "bg-green-200 text-green-900"
                : "bg-yellow-200 text-yellow-900"
            }`}
          >
            {data?.validated ? "Confirmado" : "Aguardando"}
          </p>
        </div>
      </td>
    </tr>
  );
}

PlantaoItem.propTypes = {
  data: PropTypes.any,
};

export default PlantaoItem;
