import { useState } from "react";
import Moment from "react-moment";

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

  return (
    <div className="w-full">
      {openModal && (
        <>
          <div className="text-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="bg-backgroundColor border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl  font-semibold">Description</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setOpenModal(false)}
                  >
                    <span className="bg-transparent opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-lg leading-relaxed text-white">
                    {description}
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setOpenModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-yellow-300">RoyBet Deadline</th>
            <th className="text-yellow-300">RoyBet Name</th>
            <th className="text-yellow-300">Result Time</th>
            <th className="text-yellow-300">Bet Size</th>
            <th className="text-yellow-300">Players/Pot so far</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((currentBet) => (
            <tr
              className="text-sm hover:bg-indigo-400 border-2 border-gray-500"
              key={currentBet.name}
              onClick={() => openDescriptionModal(currentBet.description)}
            >
              <th>
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
                    className="outline-none rounded bg-green-400 text-white p-3 m-2"
                    onClick={placeBet}
                  >
                    Place Bet
                  </button>
                )}
                {betState && (
                  <button
                    className="outline-none rounded bg-red-400 text-white p-3 m-2"
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
