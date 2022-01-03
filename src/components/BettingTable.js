import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { Trash, BoxArrowUpRight } from "react-bootstrap-icons";
import moment from "moment";
import Web3 from "web3";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import BetService from "../api/Bet";

import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import ReactHtmlParser from "react-html-parser";

const BettingTable = (props) => {
  const [betState, setBetState] = useState([]);
  const [betData, setBetData] = useState();
  const [alertModal, setAlertModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [betDeleteModal, setBetDeleteModal] = useState(false);
  const [betToast, setBetToast] = useState(false);
  const [betOptionModal, setBetOptionModal] = useState(false);
  const [betOptions, setBetOptions] = useState("");
  const [selectedBetOption, setSelectedBetOption] = useState("");
  const [betToastDescription, setBetToastDescription] = useState("");
  const [description, setDescription] = useState("");
  const [filteredBets, setFilteredBets] = useState([]);
  const [betResultModal, setBetResultModal] = useState(false);
  const [betID, setBetID] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const web3 = new Web3(Web3.givenProvider);
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
      objData: data,
    });
  }

  async function handleBet({ objData }) {
    try {
      await window.ethereum.send("eth_requestAccounts");

      // console.log(objData);

      let tokenAddress = "0xfe1b516a7297eb03229a8b5afad80703911e81cb";
      let toAddress = "0x2ADe6e328953a132911e0ad197E68BE882865241";
      let fromAddress = localStorage.getItem("address");

      let decimals = web3.utils.toBN(18);

      let amount = web3.utils.toBN(parseInt(objData.size));

      let minABI = [
        {
          constant: false,
          inputs: [
            {
              name: "_to",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          type: "function",
        },
      ];

      let contract = new web3.eth.Contract(minABI, tokenAddress);

      let value = amount.mul(web3.utils.toBN(10).pow(decimals));

      contract.methods
        .transfer(toAddress, value)
        .send({ from: fromAddress })
        .on("transactionHash", function (hash) {
          console.log(hash);

          setBetOptionModal(false);
          setBetOptions("");
          setSelectedBetOption("");

          setBetToast(true);
          setBetToastDescription("This bet has been successfully placed!");

          setBetState([...betState, objData.id]);

          setBetData();

          incrementCurrentBetters(objData);
        });
    } catch (error) {
      console.log(error);

      setBetOptionModal(false);
      setBetOptions("");
      setSelectedBetOption("");

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
    setDescription("");
  }

  function openBetDeleteModal(id, name) {
    setBetDeleteModal(true);
    setDescription(`Are you sure you want to delete "${name}"?`);
    setBetID(id);
  }

  function closeBetDeleteModalAndDeleteBet() {
    BetService.getInstance().deleteBet(betID);
    setBetDeleteModal(false);
  }

  function closeAlertModal() {
    setAlertModal(false);
  }

  function closeBetToast() {
    setBetToast(false);
  }

  function closeBetOptionModal() {
    setBetOptionModal(false);
  }

  function openBetOptionModal(bet) {
    if (!window.ethereum) {
      setAlertModal(true);
      setDescription("Please install Metamask!");
      return;
    }

    if (!localStorage.getItem("address")) {
      setAlertModal(true);
      setDescription("Please connect your wallet!");
      return;
    }

    if (!localStorage.getItem("username")) {
      setAlertModal(true);
      setDescription("Please connect your Discord account!");
      return;
    }

    if (
      localStorage.getItem("chainID") !== "0x63564c40" &&
      localStorage.getItem("chainID") !== "0x63564c41" &&
      localStorage.getItem("chainID") !== "0x63564c42" &&
      localStorage.getItem("chainID") !== "0x63564c43"
    ) {
      setAlertModal(true);
      setDescription("Please connect to the Harmony Mainnet!");
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

  function incrementCurrentBetters(data) {
    let selectedOption = data.selectedOption;

    delete data.selectedOption;

    data.currentBets = data.currentBets + 1;
    BetService.getInstance().editBet(data, data.id);

    data.selectedOption = selectedOption;

    BetService.getInstance().logBet(data);
  }

  function closeBetResultModal() {
    setBetResultModal(false);
  }

  function openBetResultsModal(bet) {
    if (!window.ethereum) {
      setAlertModal(true);
      setDescription("Please install Metamask!");
      return;
    }

    if (!localStorage.getItem("address")) {
      setAlertModal(true);
      setDescription("Please connect your wallet!");
      return;
    }

    setBetData(bet);

    let newOptions = bet.choices.split(",");

    setBetResultModal(true);
    setBetOptions(newOptions);
  }

  function putBetResult(data) {
    data.selectedChoice = selectedBetOption;

    BetService.getInstance().editBet(data, data.id);

    setBetResultModal(false);
  }

  const breakpointColumnsObj = {
    default: 3,
    992: 2,
    576: 1,
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const variants = {
    loaded: {
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "backIn",
      },
    },
    notLoaded: { opacity: 0 },
  };

  return (
    <div className="w-100 betting-table__wrapper">
      <Modal show={descriptionModal}>
        <div className="modal-header">
          <h4 className="modal-title">Bet Description</h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={closeDescriptionModal}
          ></button>
        </div>
        <div className="modal-body">{ReactHtmlParser(description)}</div>
        <div className="modal-footer"></div>
      </Modal>
      <Modal show={betOptionModal}>
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
      </Modal>
      <Modal show={betResultModal}>
        <div className="modal-header">
          <h5 className="modal-title">Set Bet Result</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={closeBetResultModal}
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
            onClick={() => putBetResult(betData)}
          >
            Set Bet Result
          </button>
        </div>
      </Modal>
      <Modal show={alertModal}>
        <div className="modal-header">
          <h5 className="modal-title">Alert</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={closeAlertModal}
          ></button>
        </div>
        <div className="modal-body">
          <p>{description}</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-danger"
            onClick={closeAlertModal}
          >
            Close
          </button>
        </div>
      </Modal>
      <Modal show={betDeleteModal}>
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
            onClick={closeBetDeleteModalAndDeleteBet}
          >
            Yes
          </button>
        </div>
      </Modal>
      <ToastContainer position="bottom-end">
        <Toast className="bet-toast" show={betToast}>
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
      <Masonry
        breakpointCols={breakpointColumnsObj}
        id="betting-table"
        className="betting-table"
      >
        {props.betHistoryData.map((currentBet, index) => (
          <motion.div
            className="betting-table__bet"
            key={currentBet.id}
            index={index}
            animate={isLoaded ? "loaded" : "notLoaded"}
            variants={variants}
          >
            <div className="betting-table__bet__header">
              <h3 className="betting-table__bet__name">{currentBet.name}</h3>
              <BoxArrowUpRight/>
            </div>
            <div className="betting-table__bet__body">
              <div className="betting-table__bet__body__desc">
                <p>
                  {currentBet.shortDescription}
                  <br />
                  <button
                    onClick={() => openDescriptionModal(currentBet.description)}
                  >
                    Read full description
                  </button>
                </p>
              </div>
              <div className="betting-table__bet__body__data">
                <h4>About the Bet</h4>
                <ul>
                  <li>
                    <span>Deadline:</span>{" "}
                    {moment
                      .utc(currentBet.deadline)
                      .local()
                      .format("YYYY/MM/DD h:mm A")}
                  </li>
                  <li>
                    <span>Results: </span>
                    {moment
                      .utc(currentBet.results)
                      .local()
                      .format("YYYY/MM/DD h:mm A")}
                  </li>
                  <li>
                    <span>Bet Size: </span>
                    {currentBet.size} ROY
                  </li>
                  <li>
                    <span>Players / Pot:</span>
                    {currentBet.currentBets}/{currentBet.maxBetters}
                  </li>
                </ul>
              </div>
              <div className="betting-table__bet__body__placebet">
                <button className="outline-none btn placed no-cursor">
                  Bet Placed
                </button>
              </div>
            </div>
            <div className="betting-table__bet__footer">
              <div className="betting-table__bet__footer__creator text-center mt-1">
                Bet created by {currentBet.betCreator}
              </div>
            </div>
          </motion.div>
        ))}
        {filteredBets.map((currentBet, index) => (
          <motion.div
            className="betting-table__bet"
            key={currentBet.id}
            index={index}
            animate={isLoaded ? "loaded" : "notLoaded"}
            variants={variants}
          >
            <div className="betting-table__bet__header">
              <h3 className="betting-table__bet__name">{currentBet.name}
              <Link to={{pathname: "/bet/"+currentBet.id, state: {currentBet: currentBet}}}><BoxArrowUpRight/></Link>
              </h3>
            </div>
            <div className="betting-table__bet__body">
              <div className="betting-table__bet__body__desc">
                <p>
                  {currentBet.shortDescription}
                  <br />
                  <button
                    onClick={() => openDescriptionModal(currentBet.description)}
                  >
                    Read full description
                  </button>
                </p>
              </div>
              <div className="betting-table__bet__body__data">
                <h4>About the Bet</h4>
                <ul>
                  <li>
                    <span>Deadline:</span>{" "}
                    {moment
                      .utc(currentBet.deadline)
                      .local()
                      .format("YYYY/MM/DD h:mm A")}
                  </li>
                  <li>
                    <span>Results: </span>
                    {moment
                      .utc(currentBet.results)
                      .local()
                      .format("YYYY/MM/DD h:mm A")}
                  </li>
                  <li>
                    <span>Bet Size: </span>
                    {currentBet.size} ROY
                  </li>
                  <li>
                    <span>Players / Pot:</span>
                    {currentBet.currentBets}/{currentBet.maxBetters}
                  </li>
                  {currentBet.selectedChoice && (
                    <li class="betting-table__bet__body__data__result">
                      <span>Result:</span>
                      {currentBet.selectedChoice}
                    </li>
                  )}
                </ul>
              </div>
              <div className="betting-table__bet__body__placebet">
                {!betState.includes(currentBet.id) &&
                  moment(currentBet.results).format("x") > +new Date() &&
                  moment(currentBet.deadline).format("x") > +new Date() &&
                  parseInt(currentBet.currentBets) !==
                    parseInt(currentBet.maxBetters) &&
                  !currentBet.selectedChoice && (
                    <button
                      className="outline-none btn"
                      onClick={() => openBetOptionModal(currentBet)}
                    >
                      Place Bet
                    </button>
                  )}
                {moment(currentBet.results).format("x") < +new Date() &&
                  !currentBet.selectedChoice &&
                  localStorage.getItem("username") !==
                    currentBet.betCreator && (
                    <button className="outline-none btn no-cursor">
                      Results coming soon
                    </button>
                  )}
                {currentBet.betCreator === localStorage.getItem("username") &&
                  moment(currentBet.results).format("x") < +new Date() &&
                  !currentBet.selectedChoice && (
                    <button
                      className="outline-none btn mt-3 set-result"
                      onClick={() => openBetResultsModal(currentBet)}
                    >
                      Set Result
                    </button>
                  )}
                {moment(currentBet.deadline).format("x") < +new Date() &&
                  moment(currentBet.results).format("x") > +new Date() && (
                    <button className="outline-none btn no-cursor">
                      Deadline Passed
                    </button>
                  )}
                {currentBet.selectedChoice && (
                  <button className="outline-none btn finished no-cursor">
                    Bet Finished
                  </button>
                )}
                {betState.includes(currentBet.id) && (
                  <button
                    disabled
                    className="outline-none btn placed no-cursor"
                  >
                    Bet Placed
                  </button>
                )}
                {currentBet.currentBets === parseInt(currentBet.maxBetters) &&
                  moment(currentBet.deadline).format("x") > +new Date() &&
                  moment(currentBet.results).format("x") > +new Date() && (
                    <button className="outline-none btn placement-full">
                      Bet Placements Full
                    </button>
                  )}
              </div>
            </div>
            <div className="betting-table__bet__footer">
              <div className="betting-table__bet__footer__creator text-center d-flex justify-content-center align-items-center mt-1">
                {localStorage.getItem("username") === currentBet.betCreator && (
                  <div>
                    <Trash
                      className="trash"
                      onClick={() =>
                        openBetDeleteModal(currentBet.id, currentBet.name)
                      }
                    />
                  </div>
                )}
                Bet created by {currentBet.betCreator}
              </div>
            </div>
          </motion.div>
        ))}
      </Masonry>
    </div>
  );
};

export default BettingTable;
