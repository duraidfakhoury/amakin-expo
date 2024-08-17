import React, { useEffect, useState } from "react";
import axios from "axios";
import "./tradeMarks.css";
import DataTable from "../../../components/dataTable/DataTable";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

const columns = (handleTradeClick, handleVerifyClick) => [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      const imageUrl = params.row.image ? `http://127.0.0.1:8000${params.row.image}` : "/noavatar.png";
      return <img className="pimg" src={imageUrl} alt="" style={{ width: '100%', height: 'auto' }} />;
    },
  },
  { field: "name", headerName: "Owner Name", width: 200 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "trademark_name", headerName: "Trade Mark Name", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
  {
    field: "accepted_by_admin",
    headerName: "Verification Status",
    width: 200,
    renderCell: (params) => {
      return params.row.accepted_by_admin === 1 ? "Verified" : "Not Verified";
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <IconButton 
            onClick={() => handleTradeClick(params.row.id)} 
            aria-label="view details"
          >
            <VisibilityIcon />
          </IconButton>
          {params.row.accepted_by_admin === 0 && (
            <button 
              onClick={() => handleVerifyClick(params.row.id)} 
              className="verify-button"
            >
              Verify
            </button>
          )}
        </>
      );
    },
  },
];


const TradeMarks = () => {
  const [tradeMarks, setTradeMarks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTradeMarks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/trademark/index", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTradeMarks(response.data.data);
      } catch (error) {
        console.error("Error fetching tradeMarks:", error);
      }
    };

    fetchTradeMarks();
  }, []);
  
  const handleTradeClick = (trademarkId) => {
    navigate(`/mainPage/tradeMarks/${trademarkId}`);
  };

  const handleVerifyClick = async (trademarkId) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/user/${trademarkId}/accept`,{},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      // After verification, re-fetch the trademarks or update the state to reflect the change
      setTradeMarks((prev) => 
        prev.map((trademark) =>
          trademark.id === trademarkId
            ? { ...trademark, accepted_by_admin: 1 }
            : trademark
        )
      );
    } catch (error) {
      console.error("Error verifying tradeMark:", error);
    }
  };

  return (
    <div className="tradeMarks">
      <div className="info">
        <h1>TradeMarks</h1>
      </div>
      <div className="table">
        <DataTable columns={columns(handleTradeClick, handleVerifyClick)} rows={tradeMarks} />
      </div>
    </div>
  );
};

export default TradeMarks;

