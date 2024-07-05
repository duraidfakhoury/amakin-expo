import "./alertModel.css";

const AlertModel = ({ show, handleClose, title, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <h2>{title}</h2>
          {children}
          <button onClick={handleClose}>Close</button>
        </section>
      </div>
    );
  };

export default AlertModel
