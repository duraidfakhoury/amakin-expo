import { useEffect, useState } from "react";
import "./Thome.css" ;
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const THome = () => {
    const [endedexhibitions, setEndedexhibitions] = useState([]);
    const [activeexhibitions, setActiveexhibitions] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
    const fetch_ended = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/exhibition_participate/index_ended", {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setEndedexhibitions(response.data.data); 
          
        } catch (error) {
          console.error("Error fetching exhibitions:", error);
        }
      };
      const fetch_active = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/exhibition_participate/index_active", {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setActiveexhibitions(response.data.data); 
          
        } catch (error) {
          console.error("Error fetching exhibitions:", error);
        }
      };
      fetch_active();
      fetch_ended();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="t_home">
        <div className="bbox bbox1">
            <div className="exhibitions-list">
            <h2>Recent Participations (Ended exhibitions)</h2>
            <ul>
            {endedexhibitions.map(exhibition => (
                <li key={exhibition.id} className="exhibition-item">
                    <span>{exhibition.exhibition.name}</span>
                    <span>{new Date(exhibition.exhibition.end_date).toLocaleDateString()}</span>
                </li>
                ))}
            </ul>
            </div>
        </div>
        <div className="bbox bbox2">
            <div className="exhibitions-list">
            <h2>Recent Participations (active exhibitions)</h2>
            <ul>
            {activeexhibitions.map(exhibition => (
                <li key={exhibition.id} className="exhibition-item">
                <Link to={`/TmainPage/exhibition/${exhibition.id}`}>{exhibition.exhibition.name}</Link>
                <span>{new Date(exhibition.exhibition.start_date).toLocaleDateString()}</span>
              </li>
                ))}
            </ul>
            </div>
        </div>
        <div className="bbox bbox3">
            <img src="./logo.svg" alt="" />
            <div className="info">
            <p>Want to particpate in a new exhibition</p>
            <button onClick={()=>navigate('/TmainPage/participate')}>participate</button>
            </div>
        </div>
    </div>
  );
}

export default THome;