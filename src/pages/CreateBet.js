import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, FloatingLabel, Form, Button, FormGroup } from "react-bootstrap";
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
    <div className="container d-flex align-items-center flex-column pt-5 create-bet-form pb-4" >
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
      <h1 className="text-4xl mb-4">Create your Bet</h1>
      <Form>
        <FormGroup className="create-bet-form__wrap">
          <h3> Basic Bet informations</h3>
          <p>Fill in the below information to create a bet. Please be aware the once submitted, changes to the bet cannot be made anymore.</p>
          <FloatingLabel className="create-bet-form__field create-bet-form__title" controlId="cbf-title" label="Enter the bet title">
            <Form.Control
              aria-label="Title"
              aria-describedby="Title"
              ref={titleInputRef}
              controlId="cbf-title" type="text" placeholder="Enter the bet title" />
          </FloatingLabel>
          <FloatingLabel className="create-bet-form__field create-bet-form__short-desc" controlId="cbf-short-desc" label="One sentence about the bet">
            <Form.Control controlId="cbf-short-desc" type="text" placeholder="Describe your bet in one sentence" ref={shortDescriptionInputRef}

            />
          </FloatingLabel>
          <FloatingLabel className="create-bet-form__field create-bet-form__desc" controlId="cbf-desc" label="Describe your bet in detail">
            <Form.Control controlId="cbf-desc" type="textarea" placeholder="Describe your bet in detail" ref={descriptionInputRef} />
          </FloatingLabel>
        </FormGroup>
        <div className="create-bet-form__config">
          <h3 class="create-bet-form__config__heading text-center mb-4">Configure your Bet</h3>
          <FormGroup className="create-bet-form__config__field create-bet-form__config__deadline">
            <label htmlFor="deadline" className="d-block">
              Deadline of the Bet
            </label>
            <p>The deadline of the bet defines the deadline for entering the bet. Once this pre-defined time is reached, no bet submissions are possible anymore.</p>
            <input
              type="datetime-local"
              className="form-control text-center"
              placeholder="RoyBet Deadline"
              aria-label="Deadline"
              id="deadline"
              aria-describedby="basic-addon1"
              ref={deadlineInputRef}
            />

          </FormGroup>
          <FormGroup className="create-bet-form__config__field create-bet-form__config__result">
            <label htmlFor="results" className="d-block">
              Disclosure of the results
            </label>
            <p>Set a specifc time to when the results of the bet are disclosed. At this point of time, a bet is meant to be fully done.</p>
            <input
              type="datetime-local"
              className="form-control"
              placeholder="RoyBet Results"
              aria-label="Results"
              id="results"
              aria-describedby="basic-addon1"
              ref={resultsInputRef}
            />
          </FormGroup>
          <FormGroup className="create-bet-form__config__field create-bet-form__config__betters">
            <label htmlFor="maxBetters" className="d-block">
              Maximum number of betters?
            </label>
            <p>Set the maximum number of possible betters. Currently, the only limits are the one's you set.</p>
            <input
              type="number"
              className="form-control"
              placeholder="Max RoyBetters"
              aria-label="Max Betters"
              id="maxBetters"
              aria-describedby="basic-addon1"
              ref={maxBettersInputRef}
            />
          </FormGroup>
          <FormGroup className="create-bet-form__config__field create-bet-form__config__value">
            <label htmlFor="maxBetters" className="d-block">
              What is the bet value?
            </label>
            <p>Set the value of each submission on the bet. This is the value that every entry has to pay in order to participate.</p>
            <input
              type="number"
              className="form-control"
              placeholder="Bet value"
              aria-label="Bet Value"
              id="betValue"
              aria-describedby="basic-addon1"
              ref={betValueInputRef}
            />
          </FormGroup>
          <FormGroup className="create-bet-form__config__field create-bet-form__config__betters">
            <label htmlFor="maxBetters" className="d-block">
              What are the possible choices?
            </label>
            <p>Set different possible options to win the bet. The options are seperated with a comma (",")</p>
            <input
              type="text"
              className="form-control"
              placeholder="Option 1, Option2, ..."
              aria-label="Results"
              id="results"
              aria-describedby="basic-addon1"
              ref={betChoicesInputRef}
            />
          </FormGroup>
          <button className="create-bet-form__submit" type="submit" onClick={createBet}>
            Create RoyBet
          </button>
        </div>
      </Form>




    </div>
  );
};

export default CreateBet;
