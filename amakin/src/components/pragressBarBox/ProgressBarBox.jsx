import "./progressBarBox.css" ;
import ProgressBar from "@ramonak/react-progress-bar";



const ProgressBarBox = (props ) => {
    return <div className="progressBarBox">
        <div className="boxInfo">
            <div className="title">
                <img src={props.icon} alt="" />
                <span>{props.title}</span>
            </div>
        </div>
        <div className="chartInfo">
            <div className="chart">
                <ProgressBar completed={props.percentage}
                bgColor = "#ddd"
                baseBgColor = "#2a3447"
                height="30px"
                borderRadius="10px"
                labelColor="#2a3447"
                className="wrapper"

                />
            </div>
            <div className="texts">
                <span className="percentage"
                style={{color : props.percentage< 50 ? "tomato" : "limegreen"}}
                >started at {props.startingDate}</span>
            </div>
        </div>
    </div>
}

export default ProgressBarBox ;