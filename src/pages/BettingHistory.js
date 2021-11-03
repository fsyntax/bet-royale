import { useState, useEffect } from "react";

import Header from "../components/Header";
import BetHistoryTable from "../components/BetHistoryTable";

import BetService from "../api/Bet";

const BettingHistory = () => {
  const [betHistory, setBetHistory] = useState([]);

  useEffect(() => {
    BetService.getInstance()
      .getBetHistory()
      .then((data) => {
        setBetHistory(data);
      });
  }, []);

  return (
    <div className="container d-flex align-items-center flex-column">
      <Header />
      <h1 className="text-4xl">Betting History</h1>
      <div className="my-10 w-100 d-flex justify-items-end align-items-center">
        <div className="d-flex flex-column">
          <label className="mb-1" htmlFor="betHistorySort">
            Sort By:
          </label>
          <select class="form-select">
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
