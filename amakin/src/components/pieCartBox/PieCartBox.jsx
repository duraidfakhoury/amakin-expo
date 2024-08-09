import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieCartBox.css";

const PieCartBox = ({ booths }) => {
  const reservedCount = booths.filter(booth => booth.status === "reserved").length;
  const availableCount = booths.filter(booth => booth.status === "available").length;

  const data = [
    { name: "Reserved", value: reservedCount, color: "#0088FE" },
    { name: "Available", value: availableCount, color: "#FF8042" },
  ];

  return (
    <div className="pieCartBox">
      <h1>Reserved to Available Ratio</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip contentStyle={{ background: "white", borderRadius: "5px" }} />
            <Pie
              data={data}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {data.map((item) => (
          <div className="option" key={item.name}>
            <div className="title">
              <div className="dot" style={{ background: item.color }} />
              <span>{item.name}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieCartBox;
