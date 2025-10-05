import React from "react";
import { Link } from "react-router";
import LogoCinefy from "../assets/cinefy.png";
import "./NavHeaderStyle.scss";
import "../style/reset.scss";
import "../style/utils.scss";
import ThemeToggleButton from "./ThemeToggleButton.jsx";
import Search from "./Search.jsx";
import { useMediaQuery } from "../hooks/useMediaQuery.jsx";
import { useState } from "react";

function NavHeader({ searchValue, onSearchChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)")

  const navLinks = [
    { to: "./", label: "Home" },
    { to: "./movies", label: "Movies" },
    { to: "./tvshow", label: "Tv Show" },
  ];




  return (
    <>
      <header className="nav-header">
        <Link to={"./"}>
          <img src={LogoCinefy} width={isMobile ? 50 : 100} height={""} alt="Cinefy Logo" />
        </Link>
        {!isMobile ?
          <nav>
            <ul>
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          :
          <>
            {/* se for mobile não mostra navbar */}
          </>
        }

        <div className="header-actions">
          <Search value={searchValue} onChange={onSearchChange} />
          <ThemeToggleButton />
          {isMobile &&
            <div className={`menu-hamburger ${isOpen ? 'is-open' : ''}`} onClick={() => setIsOpen(!isOpen)}>{/* desse modo se estiver aberto adiciona change, caso contrario nada. Ja na arrow function, é como num useState mas de maneira simplificada. */}
              <span />
            </div>
          }
        </div>
      </header>
      <div className="nav-popup">
        {isOpen ?
          <nav>
            <ul>
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          :
          <>
            {/* se NÂO for mobile, mostra nada*/}
          </>
        }
      </div>
    </>
  );
}
export default NavHeader;
