import PropTypes from "prop-types";

function Table({ tableHeader, children, borderRounded }) {
  return (
    <table className="w-full border-2 bg-white table-auto select-none border-none rounded-t-3xl">
      <thead className="bg-gray-100 text-sm lg:text-xl">
        <tr>
          {tableHeader?.map((header, i) => (
            <th
              key={i}
              className={`px-1 py-2 ${
                i === 0 && borderRounded ? "lg:rounded-tl-3xl" : ""
              } ${
                i === tableHeader.length - 1 && borderRounded
                  ? "lg:rounded-tr-3xl"
                  : ""
              }`}
            >
              {header.nome}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>{children}</tbody>
    </table>
  );
}

Table.propTypes = {
  children: PropTypes.any,
  tableHeader: PropTypes.any,
  borderRounded: PropTypes.any,
};

export default Table;
