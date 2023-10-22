import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* SOLO SE CREO ESTE DIV PARA CENTRAR LOS Link, CON LA className container */}
      <div className="container">
        <Link className="navbar-brand" to="/">
          My favourite videos
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          // FALTA REVISAR HACIA ARRIBA
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/new-video">
                Create new video
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
