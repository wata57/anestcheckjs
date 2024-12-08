import PropTypes from "prop-types";
import { formatYearCalendar } from "../../utils/calendar";
import { capitalize } from "../../utils/stringManipulation";

function PerfilPlantaoItem({ data }) {
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
            className={`font-bold px-2 py-1 rounded-full bg-red-200 text-red-900`}
          >
            Finalizado
          </p>
        </div>
      </td>
    </tr>
  );
}

PerfilPlantaoItem.propTypes = {
  data: PropTypes.any,
};

export default PerfilPlantaoItem;
