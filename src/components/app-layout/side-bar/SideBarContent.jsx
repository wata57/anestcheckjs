import { Link } from "react-router-dom";

function SideBarContent() {
  return (
    <>
      <Link to="/">Home</Link>
      <Link>Profile</Link>
      <Link to="/calendario">My shifts</Link>
      <Link>New Patient</Link>
      <Link>Logout</Link>
    </>
  );
}

export default SideBarContent;
