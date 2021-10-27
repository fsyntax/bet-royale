import Header from "../components/Header";
import Input from "../components/Input";

const CreateBet = () => {
  return (
    <div className="flex items-center flex-col h-full w-full">
      <Header />
      <h1 className="text-4xl">Create a Bet</h1>
      <div className="flex justify-center items-center flex-col my-10">
        <div className="flex">
          <div className="mr-3">
            <label htmlFor="deadline">RoyBet Deadline:</label>
            <Input
              type="datetime-local"
              id="deadline"
              className="px-1 py-1 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
          <div className="mr-3">
            <label htmlFor="results">RoyBet Deadline:</label>
            <Input
              type="datetime-local"
              id="results"
              className="px-1 py-1 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
          <div className="mr-3">
            <label htmlFor="max-royBetters">Max RoyBetters</label>
            <Input
              type="number"
              id="max-royBetters"
              className="px-1 py-1 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
          <div className="mr-3">
            <label htmlFor="betValue">Bet Value</label>
            <Input
              type="number"
              id="betValue"
              className="px-1 py-1 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col mt-3 w-full">
          <div className="mt-3 w-full">
            <label htmlFor="max-royBetters">Max RoyBetters</label>
            <Input
              type="number"
              id="max-royBetters"
              className="px-1 py-1 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
          <div className="mt-3 w-full">
            <label htmlFor="betValue">Bet Value</label>
            <Input
              type="number"
              id="betValue"
              className="px-1 py-1 placeholder-black text-black bg-white relative rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
        </div>
        <div className="mt-7">
          <button className="outline-none bg-green-400 rounded p-3">
            Create RoyBet
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBet;
