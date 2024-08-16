import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import "./Tparticipate.css";
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts';

const TParticipate = () => {
  const [exhibitions, setexhibitions] = useState([]);
  const [selectedexhibition, setSelectedexhibition] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [representatives, setRepresentatives] = useState([]);
  const [selectedRepresentatives, setSelectedRepresentatives] = useState([]);
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [data, setData] = useState([]);

  // Fetch active exhibitions
  useEffect(() => {
    const fetchexhibitions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/exhibition/index_active', {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setexhibitions(response.data.data);
      } catch (error) {
        console.error("Error fetching exhibitions:", error);
      }
    };
    fetchexhibitions();
  }, []);

  // Fetch representatives
  useEffect(() => {
    const fetchRepresentatives = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/representative/index', {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRepresentatives(response.data.data);
      } catch (error) {
        console.error("Error fetching representatives:", error);
      }
    };
    fetchRepresentatives();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/product/index", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Fetch booths for the selected exhibition
  useEffect(() => {
    if (selectedexhibition && selectedexhibition.booths) {
      const booths = selectedexhibition.booths.map(booth => ({
        name: `${booth.id}`,
        size: booth.size,
        price: booth.price,
        status: booth.status,
      }));
      setData(booths);
    } else {
      setData([]); // Clear the booths data if no exhibition is selected
    }
  }, [selectedexhibition]);

  const handleProductChange = (selectedOptions) => {
    // Initialize selected products with default quantity of 1
    const updatedProducts = selectedOptions.map(option => ({
      id: option.value,
      name: option.label,
      quantity: 1,
    }));
    setSelectedProducts(updatedProducts);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = quantity;
    setSelectedProducts(updatedProducts);
  };

  const handleRepresentativeChange = (selectedOptions) => {
    setSelectedRepresentatives(selectedOptions);
  };

  const handleSubmit = async () => {
    if (!selectedexhibition || !selectedBooth) {
      return;
    }

    const participationData = {
      
      products: selectedProducts.map(product => ({
        id: product.id,
        quantity: product.quantity,
      })),
      representatives: selectedRepresentatives.map(rep => rep.value),
      booth_id: selectedBooth.value,
    };

    try {
      console.log(participationData)
      const response = await axios.post(`http://127.0.0.1:8000/api/exhibition/${selectedexhibition.value}/participate`, participationData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        alert('Participation application sent successfully');
      }
    } catch (error) {
      console.error("Error submitting participation application:", error);
    }
  };

  const renderTooltip = ({ payload }) => {
    if (payload && payload.length) {
      const { name, size, price, status } = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p><strong>Booth ID:</strong> {name}</p>
          <p><strong>Size:</strong> {size} sq ft</p>
          <p><strong>Price:</strong> ${price}</p>
          <p><strong>Status:</strong> {status}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='Tparticipate'>
      <div className="T_header">Participate application</div>
      <div className="boxes">
        <div className="box box1">
          <h3>Choose the exhibition you want to participate in:</h3>
          <Select
            className="custom-select-container"
            classNamePrefix="custom-select"
            options={exhibitions.map(exhibition => ({ value: exhibition.id, label: exhibition.name, booths: exhibition.booths }))}
            onChange={setSelectedexhibition}
            placeholder="Select exhibition"
          />
        </div>
        <div className="box box2">
          <div className="pro_cont">
            <h3>Select the products that you want to ship:</h3>
            <Select
              isMulti
              className="custom-select-container"
              classNamePrefix="custom-select"
              options={products.map(product => ({ value: product.id, label: product.name }))}
              onChange={handleProductChange}
              placeholder="Select Products"
            />
            <div className="selected-products">
              {selectedProducts.map((product, index) => (
                <div key={product.id} className="selected-product">
                  <span>{product.name}</span>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    placeholder='Quantity'
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="rep_cont">
            <h3>Select the representatives to apply for visa:</h3>
            <Select
              isMulti
              className="custom-select-container"
              classNamePrefix="custom-select"
              options={representatives.map(rep => ({ value: rep.id, label: rep.name }))}
              onChange={handleRepresentativeChange}
              placeholder="Select Representatives"
            />
          </div>
        </div>
        <div className="box box3">
          <h3>Choose the desired booth:</h3>
          <Select
            className="custom-select-container"
            classNamePrefix="custom-select"
            options={(selectedexhibition?.booths || []).map(booth => ({ value: booth.id, label: booth.id }))}
            onChange={setSelectedBooth}
            placeholder="Select Booth"
            isDisabled={!selectedexhibition}  // Disable until an exhibition is selected
          />
          { 
            selectedexhibition && 
            <div className="chart">
              <ResponsiveContainer width="99%" height="100%">
                <Treemap
                  width={400}
                  height={200}
                  data={data}
                  dataKey="size"
                  stroke="#fff"
                  fill="#384256"
                >
                  <Tooltip content={renderTooltip} />
                </Treemap>
              </ResponsiveContainer>
            </div>
          }
        </div>
        <div className="box box4">
          <h2>Send your participation application:</h2>
          <button onClick={handleSubmit} disabled={!selectedexhibition || !selectedBooth}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default TParticipate;
