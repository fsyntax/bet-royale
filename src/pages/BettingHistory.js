import { useState, useEffect } from "react";

import BetHistoryTable from "../components/BetHistoryTable";

import BetService from "../api/Bet";

const BettingHistory = () => {
  const [betHistory, setBetHistory] = useState([]);

  useEffect(() => {
    BetService.getInstance()
      .getBetHistory()
      .then((data) => {
        const betLogs = [];

        for (const key in data) {
          const betLog = {
            id: key,
            ...data[key],
          };

          betLogs.push(betLog);
        }

        setBetHistory(betLogs);
      });
  }, []);

  return (
    <div className="container d-flex align-items-center flex-column">
      <h1 className="text-4xl">Betting History</h1>
      <div className="my-10 w-100 d-flex justify-items-end align-items-center">
        <div className="d-flex flex-column">
          <label className="mb-1" htmlFor="betHistorySort">
            Sort By:
          </label>
          <select className="form-select">
            <option value="betsCompleted" defaultValue>
              Bets Completed
            </option>
          </select>
        </div>
      </div>
      <div className="mt-5 d-flex justify-items-center align-items-center w-100">
        <BetHistoryTable data={betHistory} />
      </div>
    </div>
  );
};

export default BettingHistory;
