import React, { useEffect, useState } from "react";
import "./progressBarBox.css";
import ProgressBar from "@ramonak/react-progress-bar";

const ProgressBarBox = (props) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const calculatePercentage = () => {
      const startDate = new Date(props.startingDate);
      const endDate = new Date(props.endingDate);
      const today = new Date();

      const totalDuration = endDate - startDate;
      const elapsedDuration = today - startDate;

      if (elapsedDuration < 0) {
        setPercentage(0);
      } else if (elapsedDuration > totalDuration) {
        setPercentage(100);
      } else {
        setPercentage((elapsedDuration / totalDuration) * 100);
      }
    };

    calculatePercentage();
  }, [props.startingDate, props.endingDate]);

  return (
    <div className="progressBarBox">
      <div className="boxInfo">
        <div className="title">
          <img src={props.icon} alt="" />
          <span>{props.title}</span>
        </div>
      </div>
      <div className="chartInfo">
        <div className="chart">
          <ProgressBar
            completed={Math.round(percentage)}
            bgColor="#ddd"
            baseBgColor="#2a3447"
            height="30px"
            borderRadius="10px"
            labelColor="#2a3447"
            className="progress_wrapper"
          />
        </div>
        <div className="texts">
          <span>
            started at {props.startingDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarBox;
