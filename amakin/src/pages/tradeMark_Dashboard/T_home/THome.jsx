import { useState } from "react";
import "./Thome.css" ;
import { useNavigate } from "react-router-dom";

const last_participation= [
    { 
        eventid : "11",
        eventName:"the first",
        boothId:"13"
    },
    {
        eventid : "11",
        eventName:"the first",
        boothId:"13"
    },{
        eventid : "11",
        eventName:"the first",
        boothId:"13"
    },{
        eventid : "11",
        eventName:"the first",
        boothId:"13"
    },{
        eventid : "11",
        eventName:"the first",
        boothId:"13"
    },
    {
        eventid : "11",
        eventName:"the first",
        boothId:"13"
    },
    {
        eventid : "11",
        eventName:"the first",
        boothId:"13"
    },
    {
        eventid : "11",
        eventName:"the first",
        boothId:"13"
    },
]



const THome = () => {
    const [activeEvent, setActiveEvent] = useState(null);
    return (
        <div className="t_home">
          {activeEvent ? (
            <ActiveEvent event={activeEvent} />
          ) : (
            <NoActiveEvent  />
          )}
        </div>
      );
}

const ActiveEvent = ({ event }) => (
    <div>
      <h2>Active Event</h2>
      <p><strong>Event Name:</strong> {event.name}</p>
      <p><strong>Event Date:</strong> {event.date}</p>
      {/* Add more event details as needed */}
    </div>
  );
  
  const NoActiveEvent = () => {
    const navigate = useNavigate();
  
    const handleParticipateClick = () => {
      navigate('participate');
    };
  
    return (
      <div className="noActiveEvent">
        <div className="box box1">
            <div className="Box-head">
                <img src="./productIcon.svg" alt="" />
                <h2>No Active Events.</h2>
            </div>
            <p>you are not paticipated in an active event.</p>
        </div>
        <div className="box box2">
            <img src="/logo.svg" alt="" />
            <div className="texts">
                <p>Want To Paricipate in an Event.</p>
                <div className="info">
                    <p>Go To The Participation page</p>
                    <button onClick={handleParticipateClick}>Participate</button>
                </div>
            </div>
        </div>
        <div className="box box3">
            <div className="Box-head">
                <img src="./revenueIcon.svg" alt="" />
                <h2>Your Recent Participates.</h2>
            </div>
            <div className="participation-list">
            {
                last_participation.map((event)=>(
                    <div className="listItem" key={event.eventid}>
                        <span className="eventName">{event.eventName}</span>
                        <span className="boothID">Booth : {event.boothId}</span>
                    </div>
                ))
            }
            </div>
        </div>
      </div>
    );
  };

export default THome;