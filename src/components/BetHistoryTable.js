const BetHistoryTable = (props) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-yellow-300">Name</th>
          <th className="text-yellow-300">Result</th>
          <th className="text-yellow-300">Value</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((betLog) => (
          <tr className="text-sm hover:bg-indigo-400" key={betLog.name}>
            <th>{betLog.name}</th>
            <th>{betLog.result}</th>
            <th>{betLog.value}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BetHistoryTable;
