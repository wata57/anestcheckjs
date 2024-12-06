import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { MESES, MESES_INVERTED } from "../../utils/values";

function CalendarFilter() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 6 },
    (_, index) => currentYear - 3 + index
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const month = searchParams.get("mes");
  const year = searchParams.get("ano");

  function handleMinus() {
    const month = parseInt(searchParams.get("mes"));
    const year = parseInt(searchParams.get("ano"));

    let newMonth = month === 1 ? 12 : month - 1;
    let newYear = month === 1 ? year - 1 : year;
    const formattedMonth = newMonth.toString().padStart(2, "0");

    searchParams.set("mes", formattedMonth);
    searchParams.set("ano", newYear);

    setSearchParams(searchParams);
  }

  function handlePlus() {
    const month = parseInt(searchParams.get("mes"));
    const year = parseInt(searchParams.get("ano"));
    const maxYear = currentYear + 2; // Maximum year is 2 years from now

    let newMonth = month === 12 ? 1 : month + 1;
    let newYear = month === 12 ? year + 1 : year;

    if (newYear > maxYear) {
      newYear = maxYear;
      newMonth = 12;
    }

    const formattedMonth = newMonth.toString().padStart(2, "0");

    searchParams.set("mes", formattedMonth);
    searchParams.set("ano", newYear);

    setSearchParams(searchParams);
  }

  function handleChangeMonth(e) {
    searchParams.set("mes", e.target.value);
    setSearchParams(searchParams);
  }

  function handleChangeYear(e) {
    searchParams.set("ano", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div className=" animate-topCalendar absolute top-0 flex items-center justify-between pt-2 pb-6 z-[1000] bg-primary-light w-full rounded-b-3xl ">
      <div className="text-xl lg:text-4xl text-white font-bold pl-4 select-none">
        {MESES_INVERTED[month]}
      </div>
      <div className="flex items-center justify-end pr-4">
        <button
          className="text-5xl text-white cursor-pointer"
          onClick={handleMinus}
        >
          <IoIosArrowDropleft />
        </button>
        <select
          className={`rounded-xl font-semibold text-center focus:outline-none select-none custom-select transition-all duration-300 cursor-pointer bg-transparent text-white`}
          value={month}
          onChange={handleChangeMonth}
        >
          {Object.entries(MESES).map(([, valor]) => (
            <option className="text-black" key={valor} value={valor}>
              {valor}
            </option>
          ))}
        </select>
        <span className="text-white select-none">/</span>
        <select
          className={`rounded-xl font-semibold text-center focus:outline-none select-none custom-select transition-all duration-300 cursor-pointer bg-transparent text-white`}
          value={year}
          onChange={handleChangeYear}
        >
          {years.map((year) => (
            <option className="text-black" key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          className="text-5xl text-white cursor-pointer"
          onClick={handlePlus}
        >
          <IoIosArrowDropright />
        </button>
      </div>
    </div>
  );
}

export default CalendarFilter;
