import Moment from "react-moment";

const BettingTable = (props) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-yellow-300">RoyBet Deadline</th>
          <th className="text-yellow-300">RoyBet Name</th>
          <th className="text-yellow-300">Description</th>
          <th className="text-yellow-300">Result Time</th>
          <th className="text-yellow-300">Bet Size</th>
          <th className="text-yellow-300">Players/Pot so far</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((currentBet) => (
          <tr className="text-sm hover:bg-indigo-400" key={currentBet.name}>
            <th>
              <Moment date={currentBet.deadline}>{currentBet.deadline}</Moment>
            </th>
            <th>{currentBet.name}</th>
            <th>{currentBet.description}</th>
            <th>
              <Moment date={currentBet.results}>{currentBet.results}</Moment>
            </th>
            <th>{currentBet.size}</th>
            <th>{currentBet.currentBets}</th>
            <th>
              <button className="outline-none rounded bg-green-400 text-white p-3 m-2">
                Place Bet
              </button>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BettingTable;
