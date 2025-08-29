import React from "react";
import "./NavHeaderStyle.scss";
import "../style/reset.scss";
import "../style/utils.scss";

function NavHeader({ logo, width, height, alt, children }) {
  return (
    <>
      <header className="nav-header">
        <img src={logo} alt={alt} width={width} height={height} className="navbar_logo" />
        <nav>{children}</nav>
      </header>
    </>
  );
}
export default NavHeader;
