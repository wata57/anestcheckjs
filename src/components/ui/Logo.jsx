import PropTypes from "prop-types";

function Logo({ type }) {
  return (
    <h1
      className={`font-bold select-none text-blue-100 ${
        type === "nav" ? "p-4 text-2xl " : ""
      }`}
    >
      AnestCheck
    </h1>
  );
}

Logo.propTypes = {
  type: PropTypes.string,
};

export default Logo;
