import React, { useEffect, useState } from "react";
import axios from "axios";
import "./events.css";
import DataTable from "../../../components/dataTable/DataTable";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

const columns = (handleEventClick) => [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "exhibition Name", width: 200 },
  { field: "location", headerName: "exhibition Location", width: 250 },
  { field: "description", headerName: "exhibition Description", width: 350 },
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

const Events = () => {
  const [exhibitions, setexhibitions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchexhibitions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/exhibition/index", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setexhibitions(response.data.data); // Assuming the exhibitions are in the 'data' key
      } catch (error) {
        console.error("Error fetching exhibitions:", error);
      }
    };

    fetchexhibitions();
  }, []);
  
  const handleEventClick = (exhibitionId) => {
    navigate(`/mainPage/exhibition/${exhibitionId}`);
  };

  return (
    <div className="exhibitions">
      <div className="info">
        <h1>exhibitions</h1>
      </div>
      <div className="table">
        <DataTable columns={columns(handleEventClick)} rows={exhibitions} />
      </div>
    </div>
  );
};

export default Events;
