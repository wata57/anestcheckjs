import PropTypes from "prop-types";
import { formatYearCalendar } from "../../utils/calendar";
import { capitalize } from "../../utils/stringManipulation";

function PlantaoItem({ data }) {
  return (
    <tr className="text-xs lg:text-base">
      <td className="p-4 text-center flex flex-col items-center gap-1 font-bold">
        <p>{formatYearCalendar(data?.date.split("T")[0])}</p>
        <p>{capitalize(data?.event)}</p>
      </td>
      <td className="p-4 text-center lg:whitespace-nowrap">
        {data?.hospitals.hospital_name}
      </td>
      <td className="p-4 text-center">{data?.anesthesia_group_id}</td>
      <td className="p-4">
        <div className="flex items-center justify-center gap-2">
          <p
            className={`font-bold px-2 py-1 rounded-full ${
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
