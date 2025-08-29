import { Outlet } from "react-router";
import NavHeader from "../components/NavHeader.jsx";
import LogoCinefy from "../assets/cinefy.png";
import "../style/reset.scss";
import "../style/utils.scss";

function DefaultLayout() {
  return (
    <>
      <NavHeader logo={LogoCinefy} width={100} height={""} alt="Cinefy Logo">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
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
