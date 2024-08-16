import "./detailsBox.css"

const DetailsBox = (props) => {
  const { exhibitionDetails } = props;
  console.log(exhibitionDetails);
  return (
    <div className="detailsBox">
      <h1>exhibition Details</h1>
      <div className="list">
        <div className="listItem">
          <span className="itemTitle">exhibition Name: </span>
          <span className="itemValue">{exhibitionDetails.name}</span>
        </div>
        <div className="listItem">
          <span className="itemTitle">exhibition Location: </span>
          <span className="itemValue">{exhibitionDetails.location}</span>
        </div>
        <div className="listItem">
          <span className="itemTitle">exhibition Description: </span>
          <span className="itemValue">{exhibitionDetails.description}</span>
        </div>
        <div className="listItem">
          <span className="itemTitle">Start Date: </span>
          <span className="itemValue">{exhibitionDetails.start_date}</span>
        </div>
        <div className="listItem">
          <span className="itemTitle">End Date: </span>
          <span className="itemValue">{exhibitionDetails.end_date}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailsBox;
