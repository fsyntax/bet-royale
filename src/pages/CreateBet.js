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
            <Input type="datetime-local" id="deadline" />
          </div>
          <div className="mr-3">
            <label htmlFor="results">RoyBet Results:</label>
            <Input type="datetime-local" id="results" />
          </div>
          <div className="mr-3">
            <label htmlFor="max-royBetters">Max RoyBetters</label>
            <Input type="number" id="max-royBetters" />
          </div>
          <div className="mr-3">
            <label htmlFor="betValue">Bet Value</label>
            <Input type="number" id="betValue" />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col mt-3 w-full">
          <div className="mt-3 w-full">
            <label htmlFor="title">Title:</label>
            <Input type="text" id="title" />
          </div>
          <div className="mt-3 w-full flex flex-col">
            <label htmlFor="description">Description:</label>
            <textarea
              className="px-1 py-1 placeholder-black text-black bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              name="description"
              id="description"
              cols="30"
              rows="5"
            ></textarea>
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
