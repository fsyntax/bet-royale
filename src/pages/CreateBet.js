import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import Header from "../components/Header";

import BetService from "../api/Bet";

const CreateBet = () => {
  const deadlineInputRef = useRef();
  const resultsInputRef = useRef();
  const maxBettersInputRef = useRef();
  const betValueInputRef = useRef();
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();

  const [alert, setAlert] = useState(false);

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
      setAlert(true);
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

  function closeAlert() {
    setAlert(false);
  }

  return (
    <div className="container d-flex align-items-center flex-column">
      <Header />
      {alert && (
        <div
          className="alert alert-danger alert-dismissible fade show w-100 mb-5"
          role="alert"
        >
          One or more of the fields have not been filled!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={closeAlert}
          ></button>
        </div>
      )}
      <h1 className="text-4xl mb-5">Create a Bet</h1>
      <div className="flex justify-items-center align-items-center w-100 flex-column my-10">
        <div className="d-flex flex-column w-full">
          <div className="w-100 d-flex mb-3">
            <div className="w-100 mr-2">
              <label htmlFor="deadline" className="d-block">
                RoyBet Deadline:
              </label>
              <input
                type="datetime-local"
                className="form-control"
                placeholder="RoyBet Deadline"
                aria-label="Deadline"
                id="deadline"
                aria-describedby="basic-addon1"
                ref={deadlineInputRef}
              />
            </div>
            <div className="w-25"></div>
            <div className="w-100">
              <label htmlFor="results" className="d-block">
                RoyBet Results:
              </label>
              <input
                type="datetime-local"
                className="form-control"
                placeholder="RoyBet Results"
                aria-label="Results"
                id="results"
                aria-describedby="basic-addon1"
                ref={resultsInputRef}
              />
            </div>
          </div>
          <div className="w-100 d-flex">
            <div className="w-100">
              <label htmlFor="maxBetters" className="d-block">
                Max Betters:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Max RoyBetters"
                aria-label="Max Betters"
                id="maxBetters"
                aria-describedby="basic-addon1"
                ref={maxBettersInputRef}
              />
            </div>
            <div className="w-25"></div>
            <div className="w-100">
              <label htmlFor="betValue" className="d-block">
                Bet Value:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Bet Value"
                aria-label="Bet Value"
                id="betValue"
                aria-describedby="basic-addon1"
                ref={betValueInputRef}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-items-center align-items-center mt-3 w-100">
          <div className="w-100">
            <label htmlFor="title" className="d-block">
              Title:
            </label>
            <input
              type="text"
              className="form-control w-100"
              placeholder="Title"
              aria-label="Title"
              id="title"
              aria-describedby="Title"
              ref={titleInputRef}
            />
          </div>
          <div className="w-25"></div>
          <div className="w-100">
            <label htmlFor="description" className="d-block">
              Description:
            </label>
            <textarea
              className="form-control w-100"
              id="description"
              placeholder="Description"
              ref={descriptionInputRef}
            ></textarea>
          </div>
        </div>
        <div className="mt-5 d-flex justify-items-center align-items-center w-100">
          <button type="button" className="btn btn-success" onClick={createBet}>
            Create RoyBet
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBet;
