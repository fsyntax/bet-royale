import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal, Navbar, Nav, Container } from "react-bootstrap";

import logo from "../images/logo.png";
import discord from "../images/discord.svg";

const Header = (props) => {
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
    <div className="header-wrapper w-100">
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
      <Navbar
        className="main-navbar p-3"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        fixed="top"
        style={{ marginBottom: "15px" }}
      >
        <Container>
          <Navbar.Brand href="#home" className="header-logo--wrapper">
            <img
              style={{ height: "50px" }}
              className="header-logo img-fluid"
              src={logo}
              alt="logo"
            />
            <span className="header-logo--text">BetRoyale</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto d-flex">
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
                    ? "text-danger text-decoration-none"
                    : "text-white text-decoration-none"
                }
                to="/bettingHistory"
              >
                Betting History
              </Link>
            </Nav>
            <Nav>
              <Nav.Item className="d-flex">
                {localStorage.getItem("address") && (
                  <div
                    className="ml-3 d-flex flex-column"
                    style={{ marginRight: "15px" }}
                  >
                    <button className="btn btn-secondary">
                      Address: {localStorage.getItem("shortenedAddress")}
                    </button>
                  </div>
                )}
                {!localStorage.getItem("address") && (
                  <div style={{ marginRight: "15px" }}>
                    <button
                      onClick={connectToWallet}
                      className="btn btn-success ml-3"
                    >
                      Connect to a Wallet
                    </button>
                  </div>
                )}
                {localStorage.getItem("username") && (
                  <div>
                    <button className="btn btn-primary">
                      {localStorage.getItem("username")}
                    </button>
                  </div>
                )}
              </Nav.Item>
              {!localStorage.getItem("username") && (
                <a
                  className="text-decoration-none btn btn-success d-flex justify-items-center align-items-center"
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
