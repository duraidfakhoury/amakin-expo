import BigChartBox from "../../../components/bigChartBox/BigChartBox";
import ChartBox from "../../../components/chartBox/ChartBox";
import PieCartBox from "../../../components/pieCartBox/PieCartBox";
import ProgressBarBox from "../../../components/pragressBarBox/ProgressBarBox";
import TopBox from "../../../components/topBox/TopBox";
import { barChartBoxRevenue, barChartBoxVisit, chartBoxConversion, chartBoxProduct, chartBoxRevenue, chartBoxUser } from "../../../data";
import "./T_home.css" ;
const T_Home = () => {
    return (
        <div className="t_home">
            <div className="box box1"><TopBox/></div>
            <div className="box box2"><ChartBox {...chartBoxUser}/></div>
            <div className="box box3"><ProgressBarBox {...chartBoxProduct}/></div>
            <div className="box box4"><PieCartBox /></div>
            <div className="box box5"></div>
            <div className="box box6"><ChartBox {...chartBoxRevenue}/></div>
            <div className="box box7"><BigChartBox/></div>
            <div className="box box8"></div>
            <div className="box box9"></div>
        </div>
    );
}

export default T_Home;