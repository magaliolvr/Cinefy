import React from "react";
import Logo from "../assets/cinefy.png";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to</h1>
      <img src={Logo} alt="" width="300px" />
    </div>
  );
}

export default Home;
