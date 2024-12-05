import PropTypes from "prop-types";

function Home({ setSidebarOpen }) {
  return (
    <div onClick={() => setSidebarOpen(false)} className="flex-1 p-4">
      <p>Home</p>
    </div>
  );
}

Home.propTypes = {
  sidebarOpen: PropTypes.any,
  setSidebarOpen: PropTypes.any,
};

export default Home;
