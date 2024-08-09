import { useEffect, useState } from "react";
import BigChartBox from "../../../components/bigChartBox/BigChartBox";
import ChartBox from "../../../components/chartBox/ChartBox";
import PieCartBox from "../../../components/pieCartBox/PieCartBox";
import ProgressBarBox from "../../../components/pragressBarBox/ProgressBarBox";
import {  chartBoxRevenue, chartBoxUser } from "../../../data";
import "./event.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailsBox from "../../../components/detailsBox/DetailsBox";
import TopBox from "../../../components/topBox/TopBox";

const Event = () => {
  const { eventId } = useParams(); // Extract the eventId from the URL
  const [event, setEvent] = useState(null);
  const [booths, setBooths] = useState([]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/event/${eventId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEvent(response.data.data);
        const boothsResponse = await axios.get(`http://127.0.0.1:8000/api/booth/event/${eventId}/index`, {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setBooths(boothsResponse.data.data);
        } catch (error) {
          console.error('Error fetching event details or booths:', error);
        }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }



  return (
    <div className="event">
      <div className="box box1">
        <DetailsBox EventDetails={event} />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxUser} />
      </div>
      <div className="box box3">
        <ProgressBarBox  
            icon="/productIcon.svg"
            title="Event Progress"
            startingDate={event.start_date}
            endingDate={event.end_date} />
      </div>
      <div className="box box4">
        <PieCartBox booths = {booths}/>
      </div>
      <div className="box box5"></div>
      <div className="box box6">
        <ChartBox {...chartBoxRevenue} />
      </div>
      <div className="box box7">
        <TopBox/>
      </div>
      <div className="box box8">
        <BigChartBox />
      </div>
      <div className="box box9"></div>
    </div>
  );
};

export default Event;
