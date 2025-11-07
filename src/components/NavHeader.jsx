import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import LogoCinefy from "../assets/playicon.png";
import "./NavHeaderStyle.scss";
import "../style/reset.scss";
import "../style/utils.scss";
import ThemeToggleButton from "./ThemeToggleButton.jsx";
import Search from "./Search.jsx";
import { useMediaQuery } from "../hooks/useMediaQuery.jsx";

function NavHeader({ searchValue, onSearchChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");

  // ✅ Corrigido: rotas absolutas (sem './')
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/movies", label: "Movies" },
    { to: "/tvshow", label: "TV Show" },
  ];

  return (
    <>
      <header className="nav-header">
        {/* ✅ O logo também deve usar rota absoluta */}
        <NavLink to="/" className="logo">
          <img src={LogoCinefy} className="logo" alt="Cinefy Logo" />
        </NavLink>

        {/* Desktop menu */}
        {!isMobile && (
          <nav>
            <ul className="menu-list">
              {navLinks.map((link) => (
                <li className="menu-item" key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => {
                      return isActive ? "active" : undefined;
                    }}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="header-actions">
          <Search value={searchValue} onChange={onSearchChange} />
          <ThemeToggleButton />

          {/* Mobile menu button */}
          {isMobile && (
            <div
              className={`menu-hamburger ${isOpen ? "is-open" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <span />
            </div>
          )}
        </div>
      </header>

      {/* Mobile popup menu */}
      {isMobile && (
        <div className={`nav-popup ${isOpen ? "open" : ""}`}>
          {isOpen && (
            <nav>
              <ul className="menu-list">
                {navLinks.map((link) => (
                  <li className="menu-item" key={link.to}>
                    <NavLink
                      to={link.to}
                      onClick={() => setIsOpen(false)} // fecha menu ao clicar
                      className={({ isActive }) =>
                        isActive ? "active" : undefined
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      )}
    </>
  );
}

export default NavHeader;
