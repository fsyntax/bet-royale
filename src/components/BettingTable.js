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
  const [betData, setBetData] = useState();
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [betDeleteModal, setBetDeleteModal] = useState(false);
  const [metamaskModal, setMetamaskModal] = useState(false);
  const [betToast, setBetToast] = useState(false);
  const [betOptionModal, setBetOptionModal] = useState(false);
  const [betOptions, setBetOptions] = useState("");
  const [selectedBetOption, setSelectedBetOption] = useState("");
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
      await window.ethereum.send("eth_requestAccounts");

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      ethers.utils.getAddress(address);

      await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(amount),
      });

      setBetOptionModal(false);
      setBetOptions("");
      setSelectedBetOption("");

      setBetToast(true);
      setBetToastDescription("This bet has been successfully placed!");

      setBetState([...betState, objData.id]);

      BetService.getInstance().logBet(objData);

      setBetData();
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
    setBetDeleteModal(true);
    setDescription(`Are you sure you want to delete '${name}'?`);

    if (!betDeleteModal) {
      BetService.getInstance().deleteBet(id);
    }
  }

  function closeBetToast() {
    setBetToast(false);
  }

  function closeBetOptionModal() {
    setBetOptionModal(false);
  }

  function openBetOptionModal(bet) {
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

    setBetData(bet);

    let newOptions = bet.choices.split(",");

    setBetOptionModal(true);
    setBetOptions(newOptions);
  }

  function changeBetOption(e) {
    setSelectedBetOption(e.target.value);
  }

  function betOnOption(bet) {
    if (selectedBetOption !== "") {
      bet.selectedOption = selectedBetOption;
      placeBet(bet);
    } else {
      return;
    }
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
      <Modal show={betOptionModal}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Options</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeBetOptionModal}
            ></button>
          </div>
          <div className="modal-body">
            <select
              className="form-select"
              onChange={changeBetOption}
              name=""
              id=""
            >
              {betOptions &&
                betOptions.map((option) => (
                  <option key={option} value={option} defaultValue>
                    {option}
                  </option>
                ))}
            </select>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => betOnOption(betData)}
            >
              Bet
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
      <div id="betting-table" className="container betting-table w-100">
        {props.betHistoryData.map((currentBet, index) => (
          <div className="betting-table__bet" key={currentBet.id} index={index}>
            <div className="betting-table__bet__header">
              <h3 className="betting-table__bet__name">    
                {currentBet.name}
              </h3>
            </div>
            <div className="betting-table__bet__body">
              <div className="betting-table__bet__body__desc">
                <p>
                  {currentBet.shortDescription}<br />
                  <button onClick={() => openDescriptionModal(currentBet.description)}
                  >Read full description</button>
                </p>
              </div>
              <div className="betting-table__bet__body__data">
                <h4>About the Bet</h4>
                <ul>
                  <li><span>Deadline:</span> <Moment format="YYYY/MM/DD h:mm A">{currentBet.deadline}</Moment></li>
                  <li><span>Results: </span><Moment format="YYYY/MM/DD h:mm A">{currentBet.results}</Moment></li>
                  <li><span>Bet Size: </span>{currentBet.size}</li>
                  <li><span>Players / Pot:</span>{currentBet.currentBets}</li>
                </ul>
              </div>
              <div className="betting-table__bet__body__placebet">

                <button className="outline-none btn placed">
                  Bet Placed
                </button>
              </div>
            </div>
            <div className="betting-table__bet__footer">
              <div className="betting-table__bet__footer__creator text-center mt-1">
                Bet created by {currentBet.betCreator}
              </div>
            </div>
          </div>
        ))}
        {filteredBets.map((currentBet, index) => (
          <div className="betting-table__bet" key={currentBet.id} index={index}>
            <div className="betting-table__bet__header">
              <h3 className="betting-table__bet__name">
                {currentBet.name}
              </h3>
            </div>
            <div className="betting-table__bet__body">
              <div className="betting-table__bet__body__desc">
                <p>
                  {currentBet.description}<br />
                  <button onClick={() => openDescriptionModal(currentBet.description)}
                  >Read full description</button>
                </p>
              </div>
              <div className="betting-table__bet__body__data">
                <h4>About the Bet</h4>
                <ul>
                  <li><span>Deadline:</span> <Moment format="YYYY/MM/DD h:mm A">{currentBet.deadline}</Moment></li>
                  <li><span>Results: </span><Moment format="YYYY/MM/DD h:mm A">{currentBet.results}</Moment></li>
                  <li><span>Bet Size: </span>{currentBet.size}</li>
                  <li><span>Players / Pot:</span>{currentBet.currentBets}</li>
                </ul>
              </div>
              <div className="betting-table__bet__body__placebet">
                {!betState.includes(currentBet.id) && (
                  <button
                    className="outline-none btn"
                    onClick={() => openBetOptionModal(currentBet)}
                  >
                    Place Bet
                  </button>
                )}
                {betState.includes(currentBet.id) && (
                  <button className="outline-none btn placed">
                    Bet Placed
                  </button>
                )}
              </div>
            </div>
            <div className="betting-table__bet__footer">
              <div className="betting-table__bet__footer__creator text-center mt-1">
                Bet created by {currentBet.betCreator}
                {localStorage.getItem("username") === currentBet.betCreator && (
                  <div>
                    <Trash
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        deleteCurrentBet(currentBet.id, currentBet.name)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BettingTable;
