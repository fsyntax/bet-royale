import { Link, useLocation } from "react-router-dom";

import logo from "../images/logo.png";
import discord from "../images/discord.svg";

const Header = () => {
  const location = useLocation();

  return (
    <header className="flex justify-between items-center w-full p-5">
      <div>
        <img className="w-20" src={logo} alt="logo" />
      </div>
      <div className="flex justify-center items-center">
        <Link
          className={
            location.pathname === "/"
              ? "text-xl pr-3 text-green-400"
              : "text-xl pr-3"
          }
          to="/"
        >
          Home
        </Link>
        <Link
          className={
            location.pathname === "/createBet"
              ? "text-xl pr-3 text-green-400"
              : "text-xl pr-3"
          }
          to="/createBet"
        >
          Create Bet
        </Link>
        <Link
          className={
            location.pathname === "/bettingHistory"
              ? "text-xl pr-3 text-green-400"
              : "text-xl pr-3"
          }
          to="/bettingHistory"
        >
          Betting History
        </Link>
        <a
          className="outline-none rounded text-xl bg-white text-black p-3 flex justify-center items-center"
          target="_blank"
          rel="noreferrer"
          href="https://cryptoroyale.one/ranked/auth/discord/redirect"
        >
          Link With Discord!
          <img className="w-8 ml-3" src={discord} alt="discord" />
        </a>
      </div>
    </header>
  );
};

export default Header;
