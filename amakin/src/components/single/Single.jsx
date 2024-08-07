import {  Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import "./single.css" ;


const Single = (props)=> {
    return <div className="single">
        <div className="view">
            <div className="info">
                <div className="topInfo">
                    {props.img && <img src={props.img} alt="" />}
                    <h1>{props.title}</h1>
                    <button>update</button>
                </div>
                <div className="details">
                    {
                        Object.entries(props.info).map(
                            item => (
                                <div className="item" key={item[0]}>
                                    <span className="itemTitle">{item[0]}</span>
                                    <span className="itemValue">{}</span>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
            <hr />
            {
                props.chart && <div className="chart">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      width={500}
                  height={300}
                  data={props.chart.data}
                  margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                 }}
                >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {
                props.chart.dataKeys.map(
                    dataKey => (
                        <Line type="monotone" dataKey={dataKey.name} stroke={dataKey.color} activeDot={{ r: 8 }} />
                    )
                )
              }
            </LineChart>
          </ResponsiveContainer>
                </div>
            }
        </div>
        <div className="activities">
            <h2>latest avtivities</h2>
            {
                props.activities && 
                <ul>
                {
                        props.activities.map(
                        activitie => (
                            <li>
                                <div>
                                    <p>{activitie.text}</p>
                                    <time >{activitie.time}</time>
                                </div>
                            </li>
                        )
                    )
                }
            </ul>
            }
        </div>
    </div>
}

export default Single ;