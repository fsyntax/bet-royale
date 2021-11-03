const BetHistoryTable = (props) => {
  return (
    <table className="w-full table table-dark table-striped text-white border border-secondary">
      <thead>
        <tr>
          <th>Name</th>
          <th>Result</th>
          <th>Value</th>
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
