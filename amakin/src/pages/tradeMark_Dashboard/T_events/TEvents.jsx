import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tevents.css";
import DataTable from "../../../components/dataTable/DataTable";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

const columns = (handleEventClick) => [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Event Name", width: 200 },
  { field: "location", headerName: "Event Location", width: 250 },
  { field: "description", headerName: "Event Description", width: 350 },
  { field: "start_date", headerName: "Start Date", width: 200 },
  { field: "end_date", headerName: "End Date", width: 200 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return (
        <IconButton 
          onClick={() => handleEventClick(params.row.id)} 
          aria-label="view details"
        >
          <VisibilityIcon />
        </IconButton>
      );
    },
  },
];

const TEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/event/index", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEvents(response.data.data); // Assuming the events are in the 'data' key
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  
  const handleEventClick = (eventId) => {
    navigate(`/mainPage/Event/${eventId}`);
  };

  return (
    <div className="events">
      <div className="info">
        <h1>Events</h1>
      </div>
      <div className="table">
        <DataTable columns={columns(handleEventClick)} rows={events} />
      </div>
    </div>
  );
};

export default TEvents;
