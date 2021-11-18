import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";

import logo from "../images/logo.png";
import discord from "../images/discord.svg";

const Header = () => {
  const location = useLocation();

  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState("");

  function connectToWallet() {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          localStorage.setItem("address", result[0]);

          let startingAddress = localStorage.getItem("address").substring(0, 5);
          let endingAddress = localStorage
            .getItem("address")
            .substr(localStorage.getItem("address").length - 3);

          let shortenedAddress = `${startingAddress}...${endingAddress}`;

          localStorage.setItem("shortenedAddress", shortenedAddress);
        });
    } else {
      setModal(true);
      setDescription("Please install Metamask!");
    }
  }

  function accountChangedHandler(newAccount) {
    localStorage.setItem("address", newAccount);

    let startingAddress = localStorage.getItem("address").substring(0, 5);
    let endingAddress = localStorage
      .getItem("address")
      .substr(localStorage.getItem("address").length - 3);

    let shortenedAddress = `${startingAddress}...${endingAddress}`;

    localStorage.setItem("shortenedAddress", shortenedAddress);
  }

  function chainChangedHandler() {
    window.location.reload();
  }

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", accountChangedHandler);
    window.ethereum.on("chainChanged", chainChangedHandler);
  }

  function closeModal() {
    setModal(false);
  }

  return (
    <div className="w-100 mt-4">
      <Modal show={modal}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Alert</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <p>{description}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
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

          {localStorage.getItem("address") && (
            <div
              className="ml-3 d-flex flex-column"
              style={{ marginLeft: "15px" }}
            >
              <button className="btn btn-secondary">
                Address: {localStorage.getItem("shortenedAddress")}
              </button>
            </div>
          )}
          {!localStorage.getItem("address") && (
            <div style={{ marginLeft: "15px" }}>
              <button
                onClick={connectToWallet}
                className="btn btn-success ml-3"
              >
                Connect to a Wallet
              </button>
            </div>
          )}
          {localStorage.getItem("username") && (
            <div style={{ marginLeft: "15px" }}>
              <button className="btn btn-primary">
                {localStorage.getItem("username")}
              </button>
            </div>
          )}
          {!localStorage.getItem("username") && (
            <a
              className="text-decoration-none btn btn-success d-flex justify-items-center align-items-center"
              style={{ marginLeft: "15px" }}
              target="_blank"
              rel="noreferrer"
              id="login"
              href="https://discord.com/api/oauth2/authorize?client_id=903764073966096425&redirect_uri=https%3A%2F%2Fbet-royale.netlify.app%2F&response_type=token&scope=identify"
            >
              Link With Discord!
              <img
                className="ml-3 d-inline img-fluid"
                style={{ height: "25px", marginLeft: "15px" }}
                src={discord}
                alt="discord"
              />
            </a>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
