import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Trash } from "react-bootstrap-icons";
import Moment from "react-moment";

import BetService from "../api/Bet";

import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const BettingTable = (props) => {
  const [betState, setBetState] = useState([]);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [betDeleteModal, setBetDeleteModal] = useState(false);
  const [metamaskModal, setMetamaskModal] = useState(false);
  const [betToast, setBetToast] = useState(false);
  const [betToastDescription, setBetToastDescription] = useState("");
  const [description, setDescription] = useState("");
  const [filteredBets, setFilteredBets] = useState([]);

  useEffect(() => {
    const currentBets = props.data;
    const betHistory = props.betHistoryData;

    const historyIds = betHistory.map((a) => a.id);

    const remainingIds = currentBets.filter(
      (cb) => !historyIds.includes(cb.id)
    );

    setFilteredBets(remainingIds);
  }, [props.data, props.betHistoryData]);

  async function placeBet(data) {
    await handleBet({
      amount: data.size,
      address: "0x8192b322276B0E19B26bd1A25C1Ccc03Be0ef31E",
      objData: data,
    });
  }

  async function handleBet({ amount, address, objData }) {
    try {
      if (!window.ethereum) {
        setMetamaskModal(true);
        setDescription("Please install Metamask!");
        return;
      }

      if (!localStorage.getItem("address")) {
        setMetamaskModal(true);
        setDescription("Please connect your wallet!");
        return;
      }

      await window.ethereum.send("eth_requestAccounts");

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      ethers.utils.getAddress(address);

      await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(amount),
      });

      setBetToast(true);
      setBetToastDescription("This bet has been successfully placed!");

      setBetState([...betState, objData.id]);

      BetService.getInstance().logBet(objData);
    } catch (error) {
      console.clear();
      setBetToast(true);
      setBetToastDescription("Bet successfully rejected");
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

  function deleteCurrentBet(id, name) {
    console.log(id);

    setBetDeleteModal(true);
    setDescription(`Are you sure you want to delete '${name}'?`);

    if (!betDeleteModal) {
      BetService.getInstance().deleteBet(id);
    }
  }

  function closeBetToast() {
    setBetToast(false);
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
      <ToastContainer position="bottom-end">
        <Toast
          show={betToast}
          style={{ marginRight: "20px", marginBottom: "20px" }}
        >
          <div className="bg-white text-black rounded">
            <div className="toast-header bg-success text-white">
              <strong className="me-auto">Alert</strong>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={closeBetToast}
              ></button>
            </div>
            <div className="toast-body">{betToastDescription}</div>
          </div>
        </Toast>
      </ToastContainer>
      <table className="w-100 table table-dark table-hover text-white border border-secondary">
        <thead>
          <tr>
            <th scope="col"></th>
            <th className="text-center" scope="col">
              Bet Creator
            </th>
            <th className="text-center" scope="col">
              RoyBet Deadline
            </th>
            <th className="text-center" scope="col">
              RoyBet Name
            </th>
            <th className="text-center" scope="col">
              Result Time
            </th>
            <th className="text-center" scope="col">
              Bet Size
            </th>
            <th className="text-center" scope="col">
              Players/Pot so far
            </th>
          </tr>
        </thead>
        <tbody className="text-white text-center">
          {props.betHistoryData.map((currentBet, index) => (
            <tr
              className="text-sm border border-secondary"
              key={currentBet.id}
              id={index}
            >
              {localStorage.getItem("username") === currentBet.betCreator ? (
                <td>
                  <Trash
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      deleteCurrentBet(currentBet.id, currentBet.name)
                    }
                  />
                </td>
              ) : (
                <td></td>
              )}
              <td className="text-center">{currentBet.betCreator}</td>
              <td className="text-center">
                <Moment format="YYYY/MM/DD h:mm A">
                  {currentBet.deadline}
                </Moment>
              </td>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => openDescriptionModal(currentBet.description)}
                className="text-center"
              >
                {currentBet.name}
              </td>
              <td>
                <Moment format="YYYY/MM/DD h:mm A">{currentBet.results}</Moment>
              </td>
              <td>{currentBet.size}</td>
              <td>{currentBet.currentBets}</td>
              <td>
                <button className="outline-none btn btn-danger rounded bg-red-400 text-white p-3 m-2">
                  Bet Placed
                </button>
              </td>
            </tr>
          ))}
          {filteredBets.map((currentBet, index) => (
            <tr
              className="text-sm border border-secondary"
              key={currentBet.id}
              id={index}
            >
              {localStorage.getItem("username") === currentBet.betCreator ? (
                <td>
                  <Trash
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      deleteCurrentBet(currentBet.id, currentBet.name)
                    }
                  />
                </td>
              ) : (
                <td></td>
              )}
              <td>{currentBet.betCreator}</td>
              <td>
                <Moment format="YYYY/MM/DD h:mm A">
                  {currentBet.deadline}
                </Moment>
              </td>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => openDescriptionModal(currentBet.description)}
              >
                {currentBet.name}
              </td>
              <td>
                <Moment format="YYYY/MM/DD h:mm A">{currentBet.results}</Moment>
              </td>
              <td>{currentBet.size}</td>
              <td>{currentBet.currentBets}</td>
              <td>
                {!betState.includes(currentBet.id) && (
                  <button
                    className="outline-none btn btn-success rounded text-white p-3 m-2"
                    onClick={() => placeBet(currentBet)}
                  >
                    Place Bet
                  </button>
                )}
                {betState.includes(currentBet.id) && (
                  <button className="outline-none btn btn-danger rounded text-white p-3 m-2">
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
