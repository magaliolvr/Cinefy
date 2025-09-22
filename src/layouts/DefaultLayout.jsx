import { Outlet } from "react-router";
import NavHeader from "../components/NavHeader.jsx";
import Footer from "../components/Footer.jsx";
import LogoCinefy from "../assets/cinefy.png";
import "../style/reset.scss";
import "../style/utils.scss";
import { Link } from "react-router";
import Search from "../components/Search.jsx";
import { useState } from "react";


function DefaultLayout() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <NavHeader logo={LogoCinefy} width={100} height={""} alt="Cinefy Logo">
        <ul>
          <li>
            <Link to={"./"}>
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
          <li>
            <Search value={searchValue} onChange={setSearchValue} />
          </li>
        </ul>
      </NavHeader>
      <main>
        <Outlet context={{ searchValue }} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
export default DefaultLayout;
