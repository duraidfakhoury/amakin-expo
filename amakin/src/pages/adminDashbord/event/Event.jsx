import { useEffect, useState } from "react";
import BigChartBox from "../../../components/bigChartBox/BigChartBox";
import PieCartBox from "../../../components/pieCartBox/PieCartBox";
import ProgressBarBox from "../../../components/pragressBarBox/ProgressBarBox";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DetailsBox from "../../../components/detailsBox/DetailsBox";
import TopBox from "../../../components/topBox/TopBox";
import "./event.css";
const Event = () => {
  const { exhibitionId } = useParams(); // Extract the exhibitionId from the URL
  const [exhibition, setexhibition] = useState(null);
  const [booths, setBooths] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchexhibitionDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/exhibition/${exhibitionId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setexhibition(response.data.data);
        const boothsResponse = await axios.get(`http://127.0.0.1:8000/api/booth/exhibition/${exhibitionId}/index`, {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setBooths(boothsResponse.data.data);
        } catch (error) {
          console.error('Error fetching exhibition details or booths:', error);
        }
    };

    fetchexhibitionDetails();
  }, [exhibitionId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/exhibition/${exhibitionId}/destroy`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate("/mainPage/exhibitions");
    } catch (error) {
      console.error('Error deleting the exhibition:', error);
      alert('Failed to delete the exhibition. Please try again.');
    }
  };

  if (!exhibition) {
    return <div className="loading">Loading...</div>;
  }



  return (
    <div className="exhibitiont">
      <div className="booxx boox1">
        <DetailsBox exhibitionDetails={exhibition} />
      </div>
      <div className="booxx boox2">
        <h2>Delete exhibition </h2>
        <div className="btn-cont">
        <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
      <div className="booxx boox3">
        <ProgressBarBox  
            icon="/productIcon.svg"
            title="exhibition Progress"
            startingDate={exhibition.start_date}
            endingDate={exhibition.end_date} />
      </div>
      <div className="booxx boox4">
        <PieCartBox booths = {booths}/>
      </div>
      
      <div className="booxx boox7">
      <BigChartBox />
      </div>
      <div className="booxx boox8">
        <TopBox/>
      </div>
      <div className="boox boox9"></div>
    </div>
  );
};

export default Event;
