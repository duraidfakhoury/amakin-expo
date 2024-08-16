import React, { useState, useEffect } from "react";
import { ResponsiveContainer, Treemap } from "recharts";
import "./bigChartBox.css";
import Add from "../add/Add";
import axios from "axios";
import { useParams } from "react-router-dom";
import AlertModel from "../alertModel/AlertModel";
const addBooth_Columns = [
  { field: "size", type: "number", headerName: "Booth Size" },
  { field: "price", type: "number", headerName: "Booth Price" },
];

const BigChartBox = () => {
  const [data, setData] = useState([]);
  const [addBooth, setAddBooth] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState(null);
  const {exhibitionId } = useParams();
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    const fetchBooths = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/booth/exhibition/${exhibitionId}/index`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const booths = response.data.data.map(booth => ({
          name: `${booth.id}`,
          size: booth.size,
          price: booth.price,
          status: booth.status
        }));
        setData(booths);
        console.log(booths);
      } catch (error) {
        console.error('Error fetching booths:', error);
      }
    };

    fetchBooths();
  }, [exhibitionId]);

  const handleAddBooth = async (newBooth) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/booth/exhibition/${exhibitionId}/create`, newBooth, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        const updatedResponse = await axios.get(`http://127.0.0.1:8000/api/booth/exhibition/${exhibitionId}/index`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const updatedBooths = updatedResponse.data.data.map(booth => ({
          name: `${booth.id}`,
          size: booth.size,
          price: booth.price,
          status: booth.status

        }));
        setData(updatedBooths);
        setAddBooth(false);
      }
    } catch (error) {
      console.error('Error adding booth:', error);
    }
  };

  const handleNodeClick = (booth) => {
    setSelectedBooth(booth);
    setShowModel(true);
    
  };

  const closeModal = () => {
    setSelectedBooth(null);
    setShowModel(false);
  };

  return (
    <div className="bigChartBox">
      <div className="bigChartBoxHeader">
        <h1>Venue Analytics</h1>
        <button onClick={() => setAddBooth(true)}>Add</button>
      </div>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <Treemap
            width={400}
            height={200}
            data={data}
            dataKey="size"
            stroke="#fff"
            fill="#384256"
            onClick={handleNodeClick}
          />
        </ResponsiveContainer>
      </div>
      {addBooth && (
        <Add
          slug='booth'
          columns={addBooth_Columns}
          onAdd={handleAddBooth}
          setOpen={setAddBooth}
        />
      )}
      {showModel && (
        <AlertModel show={showModel} handleClose={closeModal} title="Booth Details">
          <p style={{ marginBottom: "10px" ,fontSize:"18px"}}><strong>ID:</strong> {selectedBooth.name}</p>
          <p style={{ marginBottom: "10px" ,fontSize:"18px"}}><strong>Size:</strong> {selectedBooth.size}</p>
          <p style={{ marginBottom: "10px" ,fontSize:"18px"}}><strong>Price:</strong> {selectedBooth.price}</p>
          <p style={{ marginBottom: "10px" ,fontSize:"18px"}}><strong>Status:</strong> {selectedBooth.status}</p>
        </AlertModel>
      )}
    </div>
  );
};

export default BigChartBox;
