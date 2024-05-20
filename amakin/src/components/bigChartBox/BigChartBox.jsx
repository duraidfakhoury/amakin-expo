import { ResponsiveContainer, Treemap } from "recharts";
import "./bigChartBox.css" ;
import React from "react";
const data = [
  {
    name: '1', size :980 
  },
  {
    name: '2', size :1302
  },
  {
    name: '3', size :2000
  },
  {
    name: '4', size :1302
  },
  {
    name: '5', size :3200
  },
  {
    name: '6', size :1302
  },
  {
    name: '7', size :1302
  },
  {
    name: '8', size :1302 
  },
  {
    name: '9', size :1302
  },
  {
    name: '10', size :1302
  },
  {
    name: '11', size :980 
  },
  {
    name: '12', size :1302
  },
  {
    name: '13', size :2000
  },
  {
    name: '14', size :1302
  },
  {
    name: '15', size :3200
  },
  {
    name: '16', size :1302
  },
  {
    name: '17', size :1302
  },
  {
    name: '18', size :1302 
  },
  {
    name: '19', size :1302
  },
  {
    name: '20', size :1302
  },
  {
    name: '21', size :980 
  },
  {
    name: '22', size :1302
  },
  {
    name: '23', size :2000
  },
  {
    name: '24', size :1302
  },
  {
    name: '25', size :3200
  },
  {
    name: '26', size :1302
  },
  {
    name: '27', size :1302
  },
  {
    name: '28', size :1302 
  },
  {
    name: '29', size :1302
  },
  {
    name: '30', size :1302
  },
  {
    name: '31', size :980 
  },
  {
    name: '32', size :1302
  },
  {
    name: '33', size :2000
  },
  {
    name: '34', size :1302
  },
  {
    name: '35', size :3200
  },
  {
    name: '36', size :1302
  },
  {
    name: '37', size :1302
  },
  {
    name: '38', size :1302 
  },
  {
    name: '39', size :1302
  },
  {
    name: '40', size :1302
  },
  
];

const BigChartBox = () => {
    return <div className="bigChartBox">
        <h1>Venue Analystics</h1>
        <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
        <Treemap
          width={400}
          height={200}
          data={data}
          dataKey="size"
          stroke="#fff"
          fill="#384256"
          
        />
      </ResponsiveContainer>
        </div>
    </div>
}

export default BigChartBox ; 