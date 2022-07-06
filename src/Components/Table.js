import {useRef} from "react";
import{Stack, Button, Box, TableContainer} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";

import PersonAdd from "@mui/icons-material/PersonAdd"


export function UTable({data, fields, selectItem, createNew, showTable, theme}) {
  const columns=fields.map(field=>(
    {
      field:field.field,
      headerName:field.label,
      flex:1
    }))

  const ref=useRef(null)
  let action=null
  let selectedItem={}
  const fadeOut=()=>{
    ref.current.classList.add("fade-out")
  }

  if(!showTable) return null
  return (
    <Box  m="4rem auto 0rem auto" padding="1rem min(5%,6rem)">
      <TableContainer 
        className="User-Container" 
        ref={ref}
        onTransitionEnd={(e)=>{
          if(e.target===ref.current)action(selectedItem)}
        }
      >
        <Box bgcolor={theme.palette.action.hover}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            onRowClick={
              (e)=>{
                action=selectItem
                selectedItem=e.row
                fadeOut()
              }
            }
            autoHeight={true}
          />
        </Box>
        <Stack m="1rem 0 0 0 ">
          <Button variant="contained" onClick={()=>{action=createNew;fadeOut()}}>
            <PersonAdd fontSize="large" />
          </Button>  
        </Stack>
      </TableContainer>
    </Box>
  );
  
}
  