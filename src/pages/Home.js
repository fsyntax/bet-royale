import Header from "../components/Header";
import BettingTable from "../components/BettingTable";

const Home = () => {
  return (
    <div className="flex items-center flex-col h-full w-full">
      <Header />
      <h1 className="text-4xl">RoyBet Centre</h1>
      <div className="mt-10 w-full flex justify-center items-center">
        <BettingTable />
      </div>
    </div>
  );
};

export default Home;
