import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, FloatingLabel, Form, Button } from "react-bootstrap";
import BetService from "../api/Bet";

import '../styles/createbet.scss'

const CreateBet = () => {
  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState("");

  const betChoicesInputRef = useRef();
  const deadlineInputRef = useRef();
  const resultsInputRef = useRef();
  const maxBettersInputRef = useRef();
  const betValueInputRef = useRef();
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const shortDescriptionInputRef = useRef();

  const history = useHistory();

  function createBet() {
    const currentChoices = betChoicesInputRef.current.value;
    const currentDeadline = deadlineInputRef.current.value;
    const currentResults = resultsInputRef.current.value;
    const currentMaxBetters = maxBettersInputRef.current.value;
    const currentBetValue = betValueInputRef.current.value;
    const currentTitle = titleInputRef.current.value;
    const currentDescription = descriptionInputRef.current.value;
    const currentShortDescription = shortDescriptionInputRef.current.value;

    if (!localStorage.getItem("username")) {
      setModal(true);
      setDescription("Please sign in with your Discord account!");
      return;
    }

    if (
      currentChoices === "" ||
      currentDeadline === "" ||
      currentResults === "" ||
      currentMaxBetters === "" ||
      currentBetValue === "" ||
      currentShortDescription === "" ||
      currentTitle === ""
    ) {
      setModal(true);
      setDescription("One or more of the fields have not been filled!");
      return;
    }

    const data = {
      choices: currentChoices,
      deadline: currentDeadline,
      name: currentTitle,
      description: currentDescription,
      shortDescription: currentShortDescription,
      results: currentResults,
      size: currentBetValue,
      maxBetters: currentMaxBetters,
      betCreator: localStorage.getItem("username"),
    };

    BetService.getInstance()
      .createBet(data)
      .then(() => {
        history.push("/");
      });
  }

  function closeModal() {
    setModal(false);
  }

  return (
    <div className="container d-flex align-items-center flex-column pt-5 create-bet-form" >
      <Modal show={modal}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Alert</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <p>{description}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
      <h1 className="text-4xl mb-5">Create your Bet</h1>

      <Form>
        <FloatingLabel className="create-bet-form__field create-bet-form__title" controlId="cbf-title" label="Enter the bet title">
          <Form.Control controlId="cbf-title" type="text" placeholder="Enter the bet title" />
        </FloatingLabel>
        <FloatingLabel className="create-bet-form__field create-bet-form__short-desc" controlId="cbf-short-desc" label="Describe your bet in one sentence">
          <Form.Control controlId="cbf-short-desc" type="text" placeholder="Describe your bet in one sentence" />
        </FloatingLabel>
        <FloatingLabel className="create-bet-form__field create-bet-form__desc" controlId="cbf-desc" label="Describe your bet in detail">
          <Form.Control controlId="cbf-desc" type="textarea" placeholder="Describe your bet in detail" />
        </FloatingLabel>
        <h3 class="create-bet-form__config__heading text-center">Configure your Bet</h3>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
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
                type="number"
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
                type="number"
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
          <div className="w-100 d-flex">
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
            <div className="w-25"></div>
            <div className="w-100">
              <label htmlFor="short-description" className="d-block">
                Short Description:
              </label>
              <textarea
                maxLength="75"
                className="form-control w-100"
                id="short-description"
                placeholder="Short description"
                ref={shortDescriptionInputRef}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="w-100 d-flex mt-3">
          <div className="w-100">
            <label htmlFor="results" className="d-block">
              RoyBet Choices:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="RoyBet Choices"
              aria-label="Results"
              id="results"
              aria-describedby="basic-addon1"
              ref={betChoicesInputRef}
            />
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
