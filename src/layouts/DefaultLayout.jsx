import { Outlet } from "react-router-dom";
import NavHeader from "../components/NavHeader.jsx";
import Footer from "../components/Footer.jsx";
import "../style/reset.scss";
import "../style/utils.scss";
import { useState } from "react";

function DefaultLayout() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <NavHeader searchValue={searchValue} onSearchChange={setSearchValue} />
      <main>
        <Outlet context={{ searchValue, onSearchChange: setSearchValue }} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default DefaultLayout;
