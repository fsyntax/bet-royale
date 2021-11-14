import { useState } from "react";
import { ethers } from "ethers";
import { Trash } from "react-bootstrap-icons";
import Moment from "react-moment";

import BetService from "../api/Bet";

import Modal from "react-bootstrap/Modal";

const BettingTable = (props) => {
  const [betState, setBetState] = useState([]);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [betDeleteModal, setBetDeleteModal] = useState(false);
  const [metamaskModal, setMetamaskModal] = useState(false);
  const [description, setDescription] = useState("");
  const [transactionResponse, setTransactionResponse] = useState([]);

  async function placeBet(data) {
    await handleBet({
      setTransactionResponse,
      amount: data.size,
      address: "0x8192b322276B0E19B26bd1A25C1Ccc03Be0ef31E",
      objData: data,
    });
  }

  async function handleBet({
    setTransactionResponse,
    amount,
    address,
    objData,
  }) {
    if (!window.ethereum) {
      setMetamaskModal(true);
      setDescription("Please install Metamask!");
      return;
    }

    await window.ethereum.send("eth_requestAccounts");

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    ethers.utils.getAddress(address);

    const transactionResponse = await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther(amount),
    });

    setTransactionResponse([transactionResponse]);

    console.log(objData.id);

    setBetState([...betState, objData.id]);

    console.log(betState);

    if (localStorage.getItem("address")) {
      BetService.getInstance().logBet(objData);
    } else {
      setDescription("Please connect your wallet!");
    }
  }

  function openDescriptionModal(description) {
    setDescription(description);
    setDescriptionModal(true);
  }

  function closeDescriptionModal() {
    setDescriptionModal(false);
  }

  function closeBetDeleteModal() {
    setBetDeleteModal(false);
  }

  function closemetamaskModal() {
    setMetamaskModal(false);
  }

  function deleteCurrentBet(id) {
    console.log(id);

    setBetDeleteModal(true);
    setDescription("Are you sure you want to delete this bet?");

    BetService.getInstance().deleteBet(id);
  }

  return (
    <div className="w-100">
      <Modal show={descriptionModal}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Description</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeDescriptionModal}
            ></button>
          </div>
          <div className="modal-body">
            <p>{description}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={closeDescriptionModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
      <Modal show={metamaskModal}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Alert</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closemetamaskModal}
            ></button>
          </div>
          <div className="modal-body">
            <p>{description}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={closemetamaskModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
      <Modal show={betDeleteModal}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Description</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeBetDeleteModal}
            ></button>
          </div>
          <div className="modal-body">
            <p>{description}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              onClick={closeBetDeleteModal}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={closeBetDeleteModal}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      <table className="w-full table table-dark table-striped text-white border border-secondary">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col">Bet Creator</th>
            <th scope="col">RoyBet Deadline</th>
            <th scope="col">RoyBet Name</th>
            <th scope="col">Result Time</th>
            <th scope="col">Bet Size</th>
            <th scope="col">Players/Pot so far</th>
          </tr>
        </thead>
        <tbody className="text-white text-center">
          {props.data.map((currentBet, index) => (
            <tr
              className="text-sm border border-secondary"
              key={currentBet.name}
              id={index}
            >
              <td
                style={{ cursor: "pointer" }}
                onClick={() => openDescriptionModal(currentBet.description)}
              >
                {index + 1}
              </td>
              {localStorage.getItem("username") === currentBet.betCreator && (
                <td>
                  <Trash
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteCurrentBet(currentBet.id)}
                  />
                </td>
              )}
              <td>{currentBet.betCreator}</td>
              <td className="text-center">
                <Moment format="YYYY/MM/DD HH:mm">{currentBet.deadline}</Moment>{" "}
                UTC
              </td>
              <td>{currentBet.name}</td>
              <td>
                <Moment format="YYYY/MM/DD HH:mm">{currentBet.results}</Moment>{" "}
                UTC
              </td>
              <td>{currentBet.size}</td>
              <td>{currentBet.currentBets}</td>
              <td>
                {console.log(betState)}
                {!betState.includes(currentBet.id) && (
                  <button
                    className="outline-none btn btn-success rounded bg-green-400 text-white p-3 m-2"
                    onClick={() => placeBet(currentBet)}
                  >
                    Place Bet
                  </button>
                )}
                {betState.includes(currentBet.id) && (
                  <button className="outline-none btn btn-danger rounded bg-red-400 text-white p-3 m-2">
                    Bet Placed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BettingTable;
