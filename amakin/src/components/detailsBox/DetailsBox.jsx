import "./detailsBox.css"

const DetailsBox = (props) => {
  const { EventDetails } = props;
  console.log(EventDetails);
  return (
    <div className="detailsBox">
      <h1>Event Details</h1>
      <div className="list">
        <div className="listItem">
          <span className="itemTitle">Event Name: </span>
          <span className="itemValue">{EventDetails.name}</span>
        </div>
        <div className="listItem">
          <span className="itemTitle">Event Location: </span>
          <span className="itemValue">{EventDetails.location}</span>
        </div>
        <div className="listItem">
          <span className="itemTitle">Event Description: </span>
          <span className="itemValue">{EventDetails.description}</span>
        </div>
        <div className="listItem">
          <span className="itemTitle">Start Date: </span>
          <span className="itemValue">{EventDetails.start_date}</span>
        </div>
        <div className="listItem">
          <span className="itemTitle">End Date: </span>
          <span className="itemValue">{EventDetails.end_date}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailsBox;
