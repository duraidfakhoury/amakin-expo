import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./tradeMark.css";

const TradeMark = () => {
  const {tradeMarkId } = useParams();
  const [company, setCompany] = useState({});
  const [products, setProducts] = useState([]);
  const [representatives, setRepresentatives] = useState([]);

  useEffect(() => {
    // Fetch company details
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/trademark/${tradeMarkId}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCompany(response.data.data);
      } catch (error) {
        console.error("Error fetching company details:", error);
      }
    };

    fetchCompanyDetails();
  }, [tradeMarkId]);

  useEffect(() => {
    const fetchReps = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/representative/index?user_id=${company.id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRepresentatives(response.data.data);
      } catch (error) {
        console.error("Error fetching reps:", error);
      }
    };
  
    if (company.id) {
      fetchReps();
    }
  }, [company.id]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/product/index?user_id=${company.id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching reps:", error);
      }
    };
  
    if (company.id) {
      fetchProducts();
    }
  }, [company.id]);
  

  const handleVisaStatusClick = async (representativeId) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/representative/${representativeId}/edit`,
        { visa_state: "accepted" }, // Pass the visa_state in the request body
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      // Check if the request was successful and update the state accordingly
        setRepresentatives((prevReps) =>
          prevReps.map((rep) =>
            rep.id === representativeId
              ? { ...rep, visa_state: "accepted" }
              : rep
          )
        );
    } catch (error) {
      console.error("Error accepting visa:", error);
    }
  };

  return (
    <div className="company-details">
      <h1>{company.name}</h1>
      <p>Email: {company.email}</p>
      <p>Phone: {company.phone}</p>

      <section className="products-section">
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </section>

      <section className="representatives-section">
        <h2>Representatives</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Visa Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {representatives.map((rep) => (
              <tr key={rep.id}>
                <td><img src={`http://127.0.0.1:8000${rep.image}`} alt="" /></td>
                <td>{rep.name}</td>
                <td>{rep.email}</td>
                <td>{rep.phone}</td>
                <td>{rep.visa_state}</td>
                <td>
                  {!rep.visa_accepted && (
                    <button onClick={() => handleVisaStatusClick(rep.id)}>
                      Accept Visa
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TradeMark;
