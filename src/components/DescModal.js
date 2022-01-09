import Modal from "react-bootstrap/Modal";
import ReactHtmlParser from "react-html-parser";


const DescModal = (props) => {
    
      console.log(props);
  return (
    <div className="modal-wrapper">
      <Modal show={props.state}>
        <div className="modal-header">
          <h4 className="modal-title">Bet Description</h4>
          <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => props.stateChanger(false)}
            ></button>
        </div>
        <div className="modal-body">{ReactHtmlParser(props.desc)}</div>
        <div className="modal-footer"></div>
      </Modal>
    </div>
  );
};

export default DescModal;
