import React, { useState } from "react";
import Select from "react-select";
import "./add.css";

const Add = ({ slug, columns, onAdd, setOpen, categories = [], initialData = {} }) => {
  const [formValues, setFormValues] = useState({
    ...initialData,
    categories: initialData.categories || [],
  });
  
  const [fileNames, setFileNames] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: files ? files[0] : value,
    }));

    if (files) {
      setFileNames((prevNames) => ({
        ...prevNames,
        [name]: files[0].name,
      }));
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      categories: selectedOptions ? selectedOptions.map(option => option.value) : [],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredValues = Object.fromEntries(
      Object.entries(formValues).filter(([key]) =>
        columns.some(column => column.field === key)
      )
    );

    onAdd(filteredValues);
  };

  return (
    <div className="add">
      <div className="model">
        <span className="close" onClick={() => setOpen(false)}>X</span>
        <h1>{slug}</h1>
        <form onSubmit={handleSubmit}>
          {columns.map(column => (
            <div className="item" key={column.field}>
              <label>{column.headerName}</label>
              {column.type === "dropdown" ? (
                categories && categories.length > 0 ? (
                  <Select
                    isMulti
                    name={column.field}
                    options={categories.map(category => ({
                      value: category.id,
                      label: category.name,
                    }))}
                    value={categories.filter(category => 
                      formValues.categories.includes(category.id)).map(category => ({
                        value: category.id,
                        label: category.name,
                      }))}
                    className="custom-select-container"
                    classNamePrefix="custom-select"
                    onChange={handleCategoryChange}
                  />
                ) : (
                  <p>No categories available</p>
                )
              ) : column.type === "file" ? (
                <div key={column.field} className="form-group">
                  <input
                    type="file"
                    id={column.field}
                    name={column.field}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor={column.field} className="custom-file-upload">
                    Choose File
                  </label>
                  {fileNames[column.field] && (
                    <span className="file-name">{fileNames[column.field]}</span>
                  )}
                </div>
              ) : (
                <input
                  type={column.type}
                  name={column.field}
                  placeholder={column.field}
                  value={formValues[column.field] || ""}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;

