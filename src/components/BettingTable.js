import { useState } from "react";
import { ethers } from "ethers";
import { GetHash } from "../utils/Common";
import Moment from "react-moment";

import BetService from "../api/Bet";

import Modal from "react-bootstrap/Modal";

const BettingTable = (props) => {
  const [betState, setBetState] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState(false);
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
      setDescription("Please install Metamask!");
      setAlert(true);
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

    let user = GetHash(localStorage.getItem("address"));

    console.log(user);

    setTransactionResponse([transactionResponse]);

    setBetState(true);

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

  function closeAlert() {
    setAlert(false);
  }

  return (
    <div className="w-full">
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
      {alert && (
        <div
          className="alert alert-danger alert-dismissible fade show w-100 mb-5"
          role="alert"
        >
          {description}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={closeAlert}
          ></button>
        </div>
      )}
      <table className="w-full table table-dark table-striped text-white border border-secondary">
        <thead>
          <tr>
            <th scope="col">#</th>
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
            >
              <th
                scope="row"
                style={{ cursor: "pointer" }}
                onClick={() => openDescriptionModal(currentBet.description)}
              >
                {index + 1}
              </th>
              <th className="text-center">
                <Moment date={currentBet.deadline}>
                  {currentBet.deadline}
                </Moment>
              </th>
              <th>{currentBet.name}</th>

              <th>
                <Moment date={currentBet.results}>{currentBet.results}</Moment>
              </th>
              <th>{currentBet.size}</th>

              <th>{currentBet.currentBets}</th>
              <th>
                {!betState && (
                  <button
                    className="outline-none btn btn-success rounded bg-green-400 text-white p-3 m-2"
                    onClick={() => placeBet(currentBet)}
                  >
                    Place Bet
                  </button>
                )}
                {betState && (
                  <button className="outline-none btn btn-danger rounded bg-red-400 text-white p-3 m-2">
                    Bet Placed
                  </button>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BettingTable;
