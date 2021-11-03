import { Link, useLocation } from "react-router-dom";

import logo from "../images/logo.png";
import discord from "../images/discord.svg";

const Header = () => {
  const location = useLocation();

  return (
    <header className="container d-flex justify-content-between align-items-center w-100 h-100 p-5 mb-10">
      <div className="w-100">
        <img
          style={{ height: "50px" }}
          className="img-fluid"
          src={logo}
          alt="logo"
        />
      </div>
      <div className="d-flex justify-content-between align-items-center w-100">
        <Link
          className={
            location.pathname === "/"
              ? "pr-3 text-danger text-decoration-none"
              : "pr-3 text-white text-decoration-none"
          }
          to="/"
        >
          Home
        </Link>
        <Link
          className={
            location.pathname === "/createBet"
              ? "pr-3 text-danger text-decoration-none"
              : "pr-3 text-white text-decoration-none"
          }
          to="/createBet"
        >
          Create Bet
        </Link>
        <Link
          className={
            location.pathname === "/bettingHistory"
              ? "pr-3 text-danger text-decoration-none"
              : "pr-3 text-white text-decoration-none"
          }
          to="/bettingHistory"
        >
          Betting History
        </Link>
        <a
          className="text-decoration-none btn btn-success d-flex justify-items-center align-items-center"
          target="_blank"
          rel="noreferrer"
          id="login"
          href="https://discord.com/api/oauth2/authorize?client_id=903764073966096425&redirect_uri=http%3A%2F%2Flocalhost%3A3001&response_type=token&scope=identify"
        >
          Link With Discord!
          <img
            className="ml-3 d-inline img-fluid"
            style={{ height: "50px", marginLeft: "10px" }}
            src={discord}
            alt="discord"
          />
        </a>
        <div id="info"></div>
      </div>
    </header>
  );
};

export default Header;
