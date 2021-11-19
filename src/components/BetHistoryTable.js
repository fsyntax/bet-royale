import Moment from "react-moment";

const BetHistoryTable = (props) => {
  return (
    <table className="w-100 table table-dark table-hover text-white border border-secondary">
      <thead>
        <tr>
          <th scope="col" className="text-center">
            Name
          </th>
          <th scope="col" className="text-center">
            Deadline
          </th>
          <th scope="col" className="text-center">
            Results
          </th>
          <th scope="col" className="text-center">
            Result
          </th>
          <th scope="col" className="text-center">
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((betLog) => (
          <tr className="text-sm hover:bg-indigo-400" key={betLog.name}>
            <td className="text-center">{betLog.name}</td>
            <td className="text-center">
              <Moment format="YYYY/MM/DD h:mm A">{betLog.deadline}</Moment>
            </td>
            <td className="text-center">
              <Moment format="YYYY/MM/DD h:mm A">{betLog.results}</Moment>
            </td>
            <td className="text-center">Some Result</td>
            <td className="text-center">{betLog.size}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BetHistoryTable;
