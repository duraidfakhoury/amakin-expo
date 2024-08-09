import React, { useState, useEffect } from "react";
import "./Tproducts.css";
import DataTable from "../../../components/dataTable/DataTable";
import Add from "../../../components/add/Add";
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const addColumns = [
  { field: "name", type: "string", headerName: "Name" },
  { field: "description", type: "string", headerName: "Description" },
  { field: "price", type: "string", headerName: "Price" },
  { field: "categories", type: "dropdown", headerName: "Category" },
  { field: "image", type: "file", headerName: "Image" },
];

const columns = (handleProductClick) =>[
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "image",
    headerName: "Image",
    width: 80,
    renderCell: (params) => {
      const imageUrl = params.row.image ? `http://127.0.0.1:8000${params.row.image}` : "/noavatar.png";
      return <img className="pimg" src={imageUrl} alt="" style={{ width: '100%', height: 'auto' }} />;
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 250,
  },
  {
    field: "description",
    type: "string",
    headerName: "Description",
    width: 300,
  },
  {
    field: "price",
    type: "string",
    headerName: "Price",
    width: 200,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return (
        <IconButton  
        onClick={()=>handleProductClick(params.row.id)}
        >
          <VisibilityIcon />
        </IconButton>
      );
    },
  },
];



const TProducts = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const handleProductClick = (productId) => {
    navigate(`/TmainPage/products/${productId}`);
  };
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
        console.error("Error fetching Products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/category/index", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const cats = response.data.data.map(category => ({
          id: category.id,
          name: category.name,
        }));
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/product/create`, newProduct, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const updatedResponse = await axios.get(`http://127.0.0.1:8000/api/product/index`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setProducts(updatedResponse.data.data);
        setOpen(false);
      }
    } catch (error) {
      console.error("Error adding Product:", error);
    }
  };

  

  return (
    <div className="t_products">
      <div className="info">
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Product</button>
      </div>
      <div className="table">
        <DataTable columns={columns(handleProductClick)} rows={products} slug="products" />
        {open && (
          <Add
            slug="Product"
            columns={addColumns}
            setOpen={setOpen}
            onAdd={handleAddProduct}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
};

export default TProducts;
