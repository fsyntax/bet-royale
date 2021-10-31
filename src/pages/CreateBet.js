import { useRef } from "react";
import { useHistory } from "react-router";

import Header from "../components/Header";
import Input from "../components/Input";

import BetService from "../api/Bet";

const CreateBet = () => {
  const deadlineInputRef = useRef();
  const resultsInputRef = useRef();
  const maxBettersInputRef = useRef();
  const betValueInputRef = useRef();
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();

  const history = useHistory();

  function createBet() {
    const currentDeadline = deadlineInputRef.current.value;
    const currentResults = resultsInputRef.current.value;
    const currentMaxBetters = maxBettersInputRef.current.value;
    const currentBetValue = betValueInputRef.current.value;
    const currentTitle = titleInputRef.current.value;
    const currentDescription = descriptionInputRef.current.value;

    if (
      currentDeadline === "" ||
      currentResults === "" ||
      currentMaxBetters === "" ||
      currentBetValue === "" ||
      currentTitle === "" ||
      currentDescription === ""
    ) {
      alert("One or more of the fields have not been filled out!");
      return;
    }

    const data = {
      id: Math.floor(Math.random() * 10000) + 1,
      deadline: currentDeadline,
      name: currentTitle,
      description: currentDescription,
      results: currentResults,
      size: currentBetValue,
      maxBetters: currentMaxBetters,
    };

    BetService.getInstance()
      .createBet(data)
      .then(() => {
        history.push("/");
      });
  }

  return (
    <div className="container flex items-center flex-col">
      <Header />
      <h1 className="text-4xl">Create a Bet</h1>
      <div className="flex justify-center items-center w-full flex-col my-10">
        <div className="flex w-full">
          <div className="mr-3 flex-1">
            <label htmlFor="deadline">RoyBet Deadline:</label>
            <Input type="datetime-local" id="deadline" ref={deadlineInputRef} />
          </div>
          <div className="mr-3 flex-1">
            <label htmlFor="results">RoyBet Results:</label>
            <Input type="datetime-local" id="results" ref={resultsInputRef} />
          </div>
          <div className="mr-3 flex-1">
            <label htmlFor="max-royBetters">Max RoyBetters</label>
            <Input type="text" id="max-royBetters" ref={maxBettersInputRef} />
          </div>
          <div className="mr-3 flex-1">
            <label htmlFor="betValue">Bet Value</label>
            <Input type="text" id="betValue" ref={betValueInputRef} />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col mt-3 w-full">
          <div className="mt-3 w-full">
            <label htmlFor="title">Title:</label>
            <Input type="text" id="title" ref={titleInputRef} />
          </div>
          <div className="mt-3 w-full flex flex-col">
            <label htmlFor="description">Description:</label>
            <textarea
              className="resize-none px-1 py-1 placeholder-black text-black bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
              name="description"
              id="description"
              cols="30"
              rows="5"
              ref={descriptionInputRef}
            ></textarea>
          </div>
        </div>
        <div className="mt-7">
          <button
            className="outline-none bg-green-400 rounded p-3"
            onClick={createBet}
          >
            Create RoyBet
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBet;
