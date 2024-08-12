import { useState } from "react";
import "./Thome.css" ;
import { Link, useNavigate } from "react-router-dom";

const ended= [
    { 
        eventid : "11",
        eventName:"the first",
        end_date:"2024-12-5"
    },
    {
        eventid : "11",
        eventName:"the first",
        end_date:"2024-12-5"
    },{
        eventid : "11",
        eventName:"the first",
        end_date:"2024-12-5"
    },{
        eventid : "11",
        eventName:"the first",
        end_date:"2024-12-5"
    },{
        eventid : "11",
        eventName:"the first",
        end_date:"2024-12-5"
    },
    {
        eventid : "11",
        eventName:"the first",
        end_date:"2024-12-5"
    },
    {
        eventid : "11",
        eventName:"the first",
        end_date:"2024-12-5"
    },
    {
        eventid : "11",
        eventName:"the first",
        end_date:"2024-12-5"
    },
]

const active= [
    { 
        eventid : "11",
        eventName:"the first",
        start_date:"2024-12-5"
    },
    {
        eventid : "11",
        eventName:"the first",
        start_date:"2024-12-5"
    },{
        eventid : "11",
        eventName:"the first",
        start_date:"2024-12-5"
    },{
        eventid : "11",
        eventName:"the first",
        start_date:"2024-12-5"
    },{
        eventid : "11",
        eventName:"the first",
        start_date:"2024-12-5"
    },
    {
        eventid : "11",
        eventName:"the first",
        start_date:"2024-12-5"
    },
    {
        eventid : "11",
        eventName:"the first",
        start_date:"2024-12-5"
    },
    {
        eventid : "11",
        eventName:"the first",
        start_date:"2024-12-5"
    },
]

const THome = () => {
    const [endedEvents, setEndedEvents] = useState([]);
    const [activeEvents, setActiveEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="t_home">
        <div className="box box1">
            <div className="events-list">
            <h2>Recent Participations (Ended Events)</h2>
            <ul>
            {ended.map(event => (
                <li key={event.id} className="event-item">
                    <span>{event.eventName}</span>
                    <span>{new Date(event.end_date).toLocaleDateString()}</span>
                </li>
                ))}
            </ul>
            </div>
        </div>
        <div className="box box2">
            <div className="events-list">
            <h2>Recent Participations (active Events)</h2>
            <ul>
            {active.map(event => (
                <li key={event.id} className="event-item">
                <Link to={`/TmainPage/Event/${event.id}`}>{event.eventName}</Link>
                <span>{new Date(event.start_date).toLocaleDateString()}</span>
              </li>
                ))}
            </ul>
            </div>
        </div>
        <div className="box box3">
            <img src="./logo.svg" alt="" />
            <div className="info">
            <p>Want to particpate in a new event</p>
            <button onClick={()=>navigate('/TmainPage/participate')}>participate</button>
            </div>
        </div>
    </div>
  );
}

export default THome;