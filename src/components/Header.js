import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../images/logo.png";
import discord from "../images/discord.svg";

const Header = () => {
  const location = useLocation();

  const [defaultAccount, setDefaultAccount] = useState(null);
  const [alert, setAlert] = useState(false);

  function connectToWallet() {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          localStorage.setItem("address", result[0]);
        });
    } else {
      setAlert(true);
    }
  }

  function accountChangedHandler(newAccount) {
    setDefaultAccount(newAccount);
    localStorage.setItem("address", newAccount);
  }

  function chainChangedHandler() {
    window.location.reload();
  }

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", accountChangedHandler);
    window.ethereum.on("chainChanged", chainChangedHandler);
  }

  function closeAlert() {
    setAlert(false);
  }

  return (
    <div className="w-100 mt-4">
      {alert && (
        <div
          className="alert alert-danger alert-dismissible fade show w-100 mb-5"
          role="alert"
        >
          Please install Metamask!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={closeAlert}
          ></button>
        </div>
      )}
      <header
        className="container d-flex justify-content-between align-items-center w-100 h-100 p-5 mb-10"
        style={{
          fontSize: "15px",
        }}
      >
        <div className="d-flex justify-content-start">
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
            style={{ marginRight: "15px", outline: "none" }}
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
            style={{ marginRight: "15px", outline: "none" }}
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
            style={{ marginRight: "15px", outline: "none" }}
            to="/bettingHistory"
          >
            Betting History
          </Link>

          {defaultAccount && (
            <div
              className="ml-3 d-flex flex-column"
              style={{ marginLeft: "15px" }}
            >
              <span>Address: {defaultAccount}</span>
            </div>
          )}
          {!defaultAccount && (
            <div>
              <button
                style={{ marginLeft: "15px", height: "65px" }}
                onClick={connectToWallet}
                className="btn btn-success ml-3"
              >
                Connect to a Wallet
              </button>
            </div>
          )}
          <a
            className="text-decoration-none btn btn-success d-flex justify-items-center align-items-center"
            style={{ marginLeft: "15px" }}
            target="_blank"
            rel="noreferrer"
            id="login"
            href="https://discord.com/api/oauth2/authorize?client_id=903764073966096425&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=token&scope=identify"
          >
            Link With Discord!
            <img
              className="ml-3 d-inline img-fluid"
              style={{ height: "50px", marginLeft: "15px" }}
              src={discord}
              alt="discord"
            />
          </a>
          <div id="info" style={{ marginLeft: "15px" }}></div>
        </div>
      </header>
    </div>
  );
};

export default Header;
