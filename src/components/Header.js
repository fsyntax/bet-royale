// import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { injected } from "../wallet/connectors";
import { useWeb3React } from "@web3-react/core";
import logo from "../images/logo.png";
import discord from "../images/discord.svg";

const Header = () => {
  const location = useLocation();

  // const [walletData, setWalletData] = useState([]);

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  // console.log(active);

  async function connectToWallet() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnectWallet() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  function getData() {
    console.log(active);
    console.log(account);
  }

  return (
    <header
      className="container d-flex justify-content-between align-items-center w-100 h-100 p-5 mb-10"
      style={{
        fontSize: "15px",
      }}
    >
      <div className="">
        <img
          style={{ height: "50px" }}
          className="img-fluid"
          src={logo}
          alt="logo"
        />
      </div>
      <div className="d-flex justify-content-end align-items-center w-100">
        <Link
          className={
            location.pathname === "/"
              ? "pr-3 text-danger text-decoration-none"
              : "pr-3 text-white text-decoration-none"
          }
          style={{ marginRight: "15px" }}
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
          style={{ marginRight: "15px" }}
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
          style={{ marginRight: "15px" }}
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
            style={{ height: "50px", marginLeft: "15px" }}
            src={discord}
            alt="discord"
          />
        </a>
        {active ? (
          <div
            className="ml-3 d-flex flex-column"
            style={{ marginLeft: "15px" }}
          >
            <span>Connected with: {account}</span>
            {/* <button onClick={disconnectWallet} className="btn btn-success ml-3">
              Disconnect Wallet
            </button> */}
          </div>
        ) : (
          <button
            style={{ marginLeft: "15px", height: "65px" }}
            onClick={connectToWallet}
            className="btn btn-success ml-3"
          >
            Connect to a Wallet
          </button>
        )}
        <button
          style={{ marginLeft: "15px", height: "65px" }}
          onClick={getData}
          className="btn btn-success ml-3"
        >
          Get Metamask Data
        </button>
        <div id="info"></div>
      </div>
    </header>
  );
};

export default Header;
