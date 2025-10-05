import { Outlet } from "react-router";
import NavHeader from "../components/NavHeader.jsx";
import Footer from "../components/Footer.jsx";
import "../style/reset.scss";
import "../style/utils.scss";
import { Link } from "react-router";
import Search from "../components/Search.jsx";
import { useState } from "react";


function DefaultLayout() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <NavHeader searchValue={searchValue} onSearchChange={setSearchValue} />
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
