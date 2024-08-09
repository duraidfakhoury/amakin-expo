import React, { useEffect, useState } from 'react';
import "./categories.css";
import axios from 'axios';
import Add from '../../../components/add/Add';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';

const Categories = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState();
  const addCategory_columns = [
    { field: "name", type: "string", headerName: "Category Name" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/category/index", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const cats = response.data.data.map(category => ({
          id: `${category.id}`,
          name: category.name
        }));
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async (newCategory) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/category/create`, newCategory, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        const updatedResponse = await axios.get(`http://127.0.0.1:8000/api/category/index`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const updatedCategories = updatedResponse.data.data.map(category => ({
          id: `${category.id}`,
          name: category.name
        }));
        setCategories(updatedCategories);
        setOpenAdd(false);
      }
    } catch (error) {
      console.error('Error adding Categories:', error);
    }
  };

  const handleAddButton = () => {
    setOpenAdd(true);
  };

  const handleEditButton = (categoryId) => () => {
    setEditId(categoryId);
    setOpenEdit(true);
  };

  const handleCategoryEdit = async (editedCategory) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/category/${editId}/edit`, editedCategory, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        const updatedResponse = await axios.get(`http://127.0.0.1:8000/api/category/index`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const updatedCategories = updatedResponse.data.data.map(category => ({
          id: `${category.id}`,
          name: category.name
        }));
        setCategories(updatedCategories);
        setOpenEdit(false);
      }
    } catch (error) {
      console.error('Error editing Category:', error);
    }
  };

  const handleCategoryDelete = async (categoryId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/category/${categoryId}/destroy`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        const updatedResponse = await axios.get(`http://127.0.0.1:8000/api/category/index`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const updatedCategories = updatedResponse.data.data.map(category => ({
          id: `${category.id}`,
          name: category.name
        }));
        setCategories(updatedCategories);
      }
    } catch (error) {
      console.error('Error deleting Category:', error);
    }
  };

  return (
    <div className='categories'>
      <div className="box box1">
        <div className="cat_header">
          <h2>All Categories</h2>
          <div className="categories-list">
            {categories.map((category) => (
              <div className="listItem" key={category.id}>
                <span className="categoryName">{category.name}</span>
                <div className="buttons">
                  <IconButton
                    className='edit_button'
                    onClick={handleEditButton(category.id)}
                    aria-label="Edit category"
                  >
                    <EditNoteOutlinedIcon />
                  </IconButton>
                  <IconButton
                    className='delete_button'
                    onClick={() => handleCategoryDelete(category.id)}
                    aria-label="Delete Category"
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="box box2">
        <img src="/logo.svg" alt="" />
        <div className="texts">
          <p>Add another Category to the Platform.</p>
          <div className="info">
            <p>Open the Addition form </p>
            <button onClick={handleAddButton}>Add</button>
          </div>
        </div>
      </div>
      {openAdd && (
        <Add
          slug='Add new category'
          columns={addCategory_columns}
          onAdd={handleAddCategory}
          setOpen={setOpenAdd}
        />
      )}
      {openEdit && (
        <Add
          slug='Edit category'
          columns={addCategory_columns}
          onAdd={handleCategoryEdit}
          setOpen={setOpenEdit}
        />
      )}
    </div>
  );
}

export default Categories;
