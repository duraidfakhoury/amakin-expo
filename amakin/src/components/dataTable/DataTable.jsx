import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.css"; 
import { Link } from "react-router-dom";

 

const DataTable = (props)=> {

  const handleDelete = (id)=>{
    console.log('deleted');
  }

  const actionColumn   ={
    field : "action ",
    headerName : 'Actions ',
    width : 200 ,
    renderCell :(params) =>{
      return (
        <div className="action">
          <Link to = {`${params.row.id}`}>
            <img src="view.svg" alt="" />
          </Link>
          <div className="delete" onClick={()=>handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      )
    },
  }
    return <div className="dataTable">
        <DataGrid 
        className="dataGrid"
            rows={props.rows}
            columns={[...props.columns,actionColumn]}
            initialState={{
            pagination: {
                paginationModel: {
              pageSize: 10,
                    },
                },
            }}
            slots={{toolbar : GridToolbar}}
            slotProps={
                {
                    toolbar : {
                        showQuickFilter : true ,
                        quickFilterProps : {debounceMs : 500}
                    }
                }
            }
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            disableColumnFilter
            disableDensitySelector
            disableColumnSelector
      />    
    </div>
}

export default DataTable ; 