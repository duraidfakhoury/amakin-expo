import { useEffect, useState } from "react";
import "./Tproduct.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns"; // Import date-fns for date formatting
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Add from "../../../components/add/Add";

const updateProduct_columns = [
  { field: "name", type: "string", headerName: "Name" },
  { field: "description", type: "string", headerName: "Description" },
  { field: "price", type: "string", headerName: "Price" },
  { field: "categories", type: "dropdown", headerName: "Category" },

];

const comments = [
  { commentId: "11", comment: "nice product", commenter: "the destroyer" },
  { commentId: "12", comment: "great quality", commenter: "the builder" },
  { commentId: "13", comment: "fast shipping", commenter: "the swift" },
  // Add more comments as needed
];

const RatingDisplay = ({ rating }) => {
  const validRating = typeof rating === 'number' && rating >= 0 && rating <= 5 ? rating : 0;
  const fullStars = Math.floor(validRating);
  const hasHalfStar = validRating % 1 >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className="rating-display">
      {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} className="star" />)}
      {hasHalfStar && <FaStarHalfAlt className="star" />}
      {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} className="star-empty" />)}
      <span>{rating.toFixed(1)}</span>
    </div>
  );
};

const TProduct = () => {
  const { productId } = useParams(); // Extract the productId from the URL
  const [product, setProduct] = useState(null); // Initialize product state as null
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [rate, setRate] = useState(0); // Initialize rate with a default value
  const [openUpdate, setOpenUpdate] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/product/id/${productId}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch completes
      }
    };
    
    

    const fetchProductRate = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/product/${productId}/rate`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const fetchedRate = response.data.data;
        if (typeof fetchedRate === 'number') {
          setRate(fetchedRate);
        } else {
          console.error("Invalid rate data:", fetchedRate);
          setRate(0); // Fallback to default value
        }
      } catch (error) {
        console.error("Error fetching rate:", error);
      }
    };

    fetchProduct();
    fetchProductRate();
  }, [productId]);

  const handleProductUpdate = async (updatedProduct) => {
    try {
      // Create a FormData object to handle file uploads
      const response = await axios.put(`http://127.0.0.1:8000/api/product/${productId}/edit`, updatedProduct, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        const updatedResponse = await axios.get(`http://127.0.0.1:8000/api/product/id/${productId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setProduct(updatedResponse.data.data);
        setOpenUpdate(false);
      }
    } catch (error) {
      console.error('Error editing product:', error);
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

  const handleDelete = async() =>{
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/product/${productId}/destroy`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (response.status === 200) {
          navigate('/TmainPage/products');
        }
      } catch (error) {
        console.error('Error deleting Category:', error);
      }
  }

  const handleUpdateClick = () => {
    fetchCategories();
    setOpenUpdate(true);
  };

  if (loading) {
    return <div className="loading">Loading...</div>; // Display a loading message while data is being fetched
  }

  if (!product) {
    return <div>Product not found.</div>; // Display a message if the product is not found
  }

  const imageUrl = `http://127.0.0.1:8000${product.image}`;

  return (
    <div className="product">
      <div className="box box1">
        <header>
          <img src={imageUrl} alt={product.name} className="product-image" />
          <span className="product_name">{product.name}</span>
        </header>
        <div className="product_details">
          <div className="item">
            <span className="field">Description: </span>
            <span className="value">{product.description}</span>
          </div>
          <div className="item">
            <span className="field">Price: </span>
            <span className="value">{product.price}</span>
          </div>
          <div className="item">
            <span className="field">Categories: </span>
            <span className="value">
              {product.category_products ? product.category_products.map((cp) => cp.category.name).join(", ") : 'N/A'}
            </span>
          </div>
          <div className="item">
            <span className="field">Created At: </span>
            <span className="value">{product.created_at ? format(parseISO(product.created_at), "yyyy-MM-dd HH:mm:ss") : 'N/A'}</span>
          </div>
          <div className="item">
            <span className="field">Updated At: </span>
            <span className="value">{product.updated_at ? format(parseISO(product.updated_at), "yyyy-MM-dd HH:mm:ss") : 'N/A'}</span>
          </div>
        </div>
      </div>
      <div className="box box2">
        <div className="b_header">
          <img src="/revenueicon.svg" alt="" />
          <h2>Product Rating</h2>
        </div>
        <div className="ratCont">
          <RatingDisplay rating={rate} />
        </div>
      </div>
      <div className="box box3">
        <span>Update the product Info</span>
        <button onClick={handleUpdateClick}>Update</button>
      </div>
      <div className="box box4">
        <div className="b_header">
          <img src="/revenueicon.svg" alt="" />
          <h2>Product Comments</h2>
        </div>
        <div className="comments-list">
          {comments.map((comment) => (
            <div className="listItem" key={comment.commentId}>
              <span className="commentValue">{comment.comment}</span>
              <span className="commenter">{comment.commenter}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="box box5">
        <span>Delete the Product</span>
        <button onClick={handleDelete}>Delete</button>
      </div>
      {openUpdate && (
        <Add
          slug='update product'
          columns={updateProduct_columns}
          onAdd={handleProductUpdate}
          setOpen={setOpenUpdate}
          categories={categories}
        />
      )}
    </div>
  );
};

export default TProduct;
