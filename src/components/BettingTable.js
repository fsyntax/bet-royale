import { useState } from "react";
import Moment from "react-moment";

import Modal from "react-bootstrap/Modal";

const BettingTable = (props) => {
  const [betState, setBetState] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState("");

  function placeBet() {
    setBetState(true);
  }

  function unPlaceBet() {
    setBetState(false);
  }

  function openDescriptionModal(description) {
    setDescription(description);
    setOpenModal(true);
  }

  function closeDescriptionModal() {
    setOpenModal(false);
  }

  return (
    <div className="w-full">
      <Modal show={openModal}>
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
              onClick={() => openDescriptionModal(currentBet.description)}
            >
              <th scope="row">{index + 1}</th>
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
                    onClick={placeBet}
                  >
                    Place Bet
                  </button>
                )}
                {betState && (
                  <button
                    className="outline-none btn btn-danger rounded bg-red-400 text-white p-3 m-2"
                    onClick={unPlaceBet}
                  >
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
