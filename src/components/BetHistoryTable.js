import moment from "moment";

const BetHistoryTable = (props) => {
  return (
    <div className="container betting-table w-100">
      {props.data.map((currentBet, index) => (
        <div className="betting-table__bet" key={currentBet.id} index={index}>
          <div className="betting-table__bet__header">
            <h3 className="betting-table__bet__name">{currentBet.name}</h3>
          </div>
          <div className="betting-table__bet__body mt-3">
            <div className="betting-table__bet__body__data">
              <h4>About the Bet</h4>
              <ul>
                <li>
                  <span>Selected Choice:</span> {currentBet.selectedOption}
                </li>
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
                  {currentBet.size}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BetHistoryTable;
