import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieCartBox.css" ; 

const data = [
    { name: "Reserved ", value: 25, color: "#0088FE" },
    { name: "Empty", value: 15, color: "#FF8042" },
  ];

const PieCartBox = ()=> {
    return <div className="pieCartBox">
        <h1>Reserved to Empty Ratio.</h1>
        <div className="chart">
            <ResponsiveContainer width="99%" height={300}>
                
            <PieChart>
                <Tooltip 
                contentStyle={{background :"white" , borderRadius : " 5px"}}
                />
        <Pie
          data={data}
          innerRadius={"70%"}
          outerRadius={"90%"}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((item) => (
            <Cell key={item.name} fill={item.color } />
          ))}
        </Pie>
      </PieChart>
                
            </ResponsiveContainer>
        </div>
        <div className="options">
            {data.map((item)=>(
              <div className="option" key = {item.name}>
                <div className="title">
                    <div className="dot" style={{background : item.color}}/>
                    <span>{item.name}</span>
                </div> 
                <span>{item.value}</span>
              </div> 
            ) )}
        </div>
    </div>
}

export default PieCartBox ;