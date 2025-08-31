import { Outlet } from "react-router";
import NavHeader from "../components/NavHeader.jsx";
import LogoCinefy from "../assets/cinefy.png";
import "../style/reset.scss";
import "../style/utils.scss";
import { Link } from "react-router";

function DefaultLayout() {
  return (
    <>
      <NavHeader logo={LogoCinefy} width={100} height={""} alt="Cinefy Logo">
        <ul>
          <li>
            <Link to={"./home"}>
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to={"./movies"}>
              <span>Movies</span>
            </Link>
          </li>
          <li>
            <Link to={"./tvshow"}>
              <span>Tv Show</span>
            </Link>
          </li>
        </ul>
      </NavHeader>
      <main>
        <Outlet />
      </main>
      <footer />
    </>
  );
}
export default DefaultLayout;
