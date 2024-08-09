import DataTable from "../../../components/dataTable/DataTable";
import "./Trepresentatives.css";
import { useEffect, useState } from "react";
import Add from "../../../components/add/Add";
import axios from "axios";
import { IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

const addRep_columns = [
  { field: "name", type: "string", headerName: "Name" },
  { field: "phone", type: "string", headerName: "Phone" },
  { field: "email", type: "string", headerName: "Email" },
  { field: "passport_number", type: "string", headerName: "Passport Number" },
  { field: "image", type: "file", headerName: "Image" },
];

const columns = (handleRepDelete, handleRepEdit) => [
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
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 250,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "passport_number",
    type: "string",
    headerName: "Passport Number",
    width: 250,
  },
  {
    field: "visa_state",
    headerName: "Visa State",
    width: 150,
    type: "string",
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="buttons">
          <IconButton
            onClick={() => handleRepDelete(params.row.id)}
            className="delete_btn"
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => handleRepEdit(params.row.id)}
            className="edit_btn"
          >
            <EditNoteOutlinedIcon />
          </IconButton>
        </div>
      );
    },
  },
];

const TRepresnetatives = () => {
  const [open, setOpen] = useState(false);
  const [reps, setReps] = useState([]);
  const [currentRep, setCurrentRep] = useState(null); // State for the current representative being edited
  const [isEdit, setIsEdit] = useState(false); // State to determine if it's an edit action

  useEffect(() => {
    const fetchReps = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/representative/index", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setReps(response.data.data);
      } catch (error) {
        console.error("Error fetching reps:", error);
      }
    };
    fetchReps();
  }, []);

  const handleAddRep = async (newRepresentative) => {
    try {
      const formData = new FormData();
      Object.entries(newRepresentative).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(`http://127.0.0.1:8000/api/representative/create`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const updatedResponse = await axios.get(`http://127.0.0.1:8000/api/representative/index`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setReps(updatedResponse.data.data);
        setOpen(false);
      }
    } catch (error) {
      console.error("Error adding representative:", error);
    }
  };

  const handleRepEdit = async (repId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/representative/${repId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        setCurrentRep(response.data.data);
        setIsEdit(true);
        setOpen(true);
      }
    } catch (error) {
      console.error("Error fetching representative data for edit:", error);
    }
  };

  const handleUpdateRep = async (updatedRepresentative) => {
    try {
      console.log(updatedRepresentative)
      const response = await axios.put(`http://127.0.0.1:8000/api/representative/${currentRep.id}/edit`, updatedRepresentative, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        console.log(response);
        const updatedResponse = await axios.get(`http://127.0.0.1:8000/api/representative/index`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setReps(updatedResponse.data.data);
        setOpen(false);
        setIsEdit(false);
        setCurrentRep(null);
      }
    } catch (error) {
      console.error("Error updating representative:", error);
    }
  };

  const handleRepDelete = async (repId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/representative/${repId}/destroy`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        const updatedResponse = await axios.get(`http://127.0.0.1:8000/api/representative/index`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setReps(updatedResponse.data.data);
      }
    } catch (error) {
      console.error('Error deleting representative:', error);
    }
  };

  return (
    <div className="Representatives">
      <div className="info">
        <h1>Representatives</h1>
        <button onClick={() => {
          setOpen(true);
          setIsEdit(false);
          setCurrentRep(null); // Clear currentRep when adding a new representative
        }}>Add New Rep</button>
      </div>
      <div className="table">
        <DataTable
          columns={columns(handleRepDelete, handleRepEdit)}
          rows={reps}
          slug="representative"
        />
        {open && (
          <Add
            slug={isEdit ? 'Edit Representative' : 'Add New Representative'}
            columns={addRep_columns}
            setOpen={setOpen}
            onAdd={isEdit ? handleUpdateRep : handleAddRep}
            initialData={isEdit ? currentRep : null} // Pass current representative data for editing
          />
        )}
      </div>
    </div>
  );
};

export default TRepresnetatives;
