import Moment from "react-moment";

const BetHistoryTable = (props) => {
  return (
    <table className="w-100 table table-dark table-hover text-white border border-secondary">
      <thead>
        <tr>
          <th>Name</th>
          <th>Deadline</th>
          <th>Results</th>
          <th>Result</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((betLog) => (
          <tr className="text-sm hover:bg-indigo-400" key={betLog.name}>
            <td>{betLog.name}</td>
            <td>
              <Moment format="YYYY/MM/DD h:mm A">{betLog.deadline}</Moment>
            </td>
            <td>
              <Moment format="YYYY/MM/DD h:mm A">{betLog.results}</Moment>
            </td>
            <td>Some Result</td>
            <td>{betLog.size}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BetHistoryTable;
