import { Link, useLocation } from "react-router-dom";

import logo from "../images/logo.png";
import discord from "../images/discord.svg";

const Header = () => {
  const location = useLocation();

  window.onload = () => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [
      fragment.get("access_token"),
      fragment.get("token_type"),
    ];

    if (!accessToken) {
      return (document.getElementById("login").style.display = "block");
    }

    fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then((result) => result.json())
      .then((response) => {
        const { username, discriminator } = response;
        document.getElementById(
          "info"
        ).innerText += ` ${username}#${discriminator}`;
      })
      .catch(console.error);
  };

  return (
    <header className="flex justify-between items-center w-full p-5 mb-10">
      <div>
        <img className="w-20" src={logo} alt="logo" />
      </div>
      <div className="flex justify-center items-center">
        <Link
          className={location.pathname === "/" ? "pr-3 text-green-400" : "pr-3"}
          to="/"
        >
          Home
        </Link>
        <Link
          className={
            location.pathname === "/createBet" ? "pr-3 text-green-400" : "pr-3"
          }
          to="/createBet"
        >
          Create Bet
        </Link>
        <Link
          className={
            location.pathname === "/bettingHistory"
              ? "pr-3 text-green-400"
              : "pr-3"
          }
          to="/bettingHistory"
        >
          Betting History
        </Link>
        <a
          className="outline-none rounded bg-white text-black p-3 flex justify-center items-center"
          target="_blank"
          rel="noreferrer"
          id="login"
          href="https://discord.com/api/oauth2/authorize?client_id=903764073966096425&redirect_uri=http%3A%2F%2Flocalhost%3A5000&response_type=code&scope=identify"
        >
          Link With Discord!
          <img className="w-8 ml-3" src={discord} alt="discord" />
        </a>
        <div id="info"></div>
      </div>
    </header>
  );
};

export default Header;
