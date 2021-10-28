import dummyData from "../dummyData.json";

import Header from "../components/Header";
import BetHistoryTable from "../components/BetHistoryTable";

const BettingHistory = () => {
  return (
    <div className="container flex items-center flex-col">
      <Header />
      <h1 className="text-4xl">Betting History</h1>
      <div className="my-10 w-full flex justify-end items-center">
        <div className="flex flex-col">
          <label className="mb-1" htmlFor="betHistorySort">
            Sort By:
          </label>
          <select
            className="px-3 py-3 placeholder-black text-black bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"
            name="betHistorySort"
            id="betHistorySort"
          >
            <option value="betsCompleted" selected>
              Bets Completed
            </option>
          </select>
        </div>
      </div>
      <div className="mt-10 w-full">
        <BetHistoryTable data={dummyData.betHistory} />
      </div>
    </div>
  );
};

export default BettingHistory;
