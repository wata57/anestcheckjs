import PropTypes from "prop-types";
import { formatYearCalendar } from "../../utils/calendar";
import { capitalize } from "../../utils/stringManipulation";

function AdminPlantaoPendenteItem({ data, checked, setIsChecked }) {
  const handleRowClick = (e) => {
    // Prevent triggering on checkbox click (if clicked on the checkbox itself)
    if (e.target.type !== "checkbox") {
      setIsChecked(); // Toggle the checkbox state
    }
  };

  return (
    <tr
      onClick={handleRowClick}
      className="text-xs lg:text-base cursor-pointer"
    >
      <td className="px-4 text-center">
        <input
          id={`checkbox-${data.id}`}
          type="checkbox"
          checked={checked}
          onChange={setIsChecked}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 cursor-pointer"
        />
      </td>
      <td className="px-4 py-3 text-center">{data?.profile.name}</td>
      <td className="px-4 py-3 text-center flex flex-col items-center gap-1 font-bold">
        <p>{formatYearCalendar(data?.date.split("T")[0])}</p>
        <p>{capitalize(data?.event)}</p>
      </td>
      <td className="px-4 py-3 text-center lg:whitespace-nowrap">
        {data?.hospitals.hospital_name}
      </td>
      {/* <td className="px-4 py-3">
        <div className="flex items-center justify-center gap-2">
          <p className="font-bold px-2 py-1 rounded-full bg-yellow-200 text-yellow-900">
            Aguardando
          </p>
        </div>
      </td> */}
    </tr>
  );
}

AdminPlantaoPendenteItem.propTypes = {
  data: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  setIsChecked: PropTypes.func.isRequired,
};

export default AdminPlantaoPendenteItem;
