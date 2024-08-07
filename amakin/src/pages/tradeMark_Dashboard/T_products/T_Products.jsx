import { useState } from "react";
import "./T_products.css" ;
import DataTable from "../../../components/dataTable/DataTable";
import Add from "../../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../../data";

const columns  = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "img",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.img || "/noavatar.png"} alt="" />;
      },
    },
    {
      field: "title",
      type: "string",
      headerName: "Title",
      width: 250,
    },
    {
      field: "color",
      type: "string",
      headerName: "Color",
      width: 150,
    },
    {
      field: "price",
      type: "string",
      headerName: "Price",
      width: 200,
    },
    {
      field: "producer",
      headerName: "Producer",
      type: "string",
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      type: "string",
    },
    {
      field: "inStock",
      headerName: "In Stock",
      width: 150,
      type: "boolean",
    },
  ];
  

const T_Products = () => {
    const [open , setOpen] = useState(false) ;
    return (
        <div className="t_products">
            <div className="info">
                <h1>Products</h1>
                <button onClick={()=>setOpen(true)}>Add New Product</button>
            </div>
            <div className="table">
                <DataTable columns={columns} rows = {products} slug = "products"/>
                {open  && <Add  slug = 'Product' columns={columns} setOpen = {setOpen}/>}
            </div>

        </div>
    );
}

export default T_Products;