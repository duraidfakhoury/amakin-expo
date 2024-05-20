import { Link } from "react-router-dom";
import "./chartBox.css" ;
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";


const ChartBox = (props ) => {
    return <div className="chartBox">
        <div className="boxInfo">
            <div className="title">
                <img src={props.icon} alt="" />
                <span>{props.title}</span>
            </div>
            <h1>{props.number}</h1>
            <Link to = "/" style={{color : props.color}}>View all</Link>
        </div>
        <div className="chartInfo">
            <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={props.chartData}>
                    <Line 
                    type="monotone" 
                    dataKey={props.dataKey} 
                    stroke={props.color} 
                    strokeWidth={2} 
                    dot = {false} />
                    <Tooltip
                        contentStyle={{background : "transparent" , border : "none"}}
                        labelStyle={{display : "none"}}
                        position={{x : 10 , y : 86 }}
                    />
                </LineChart>
            </ResponsiveContainer>

            </div>
        </div>
    </div>
}

export default ChartBox ;