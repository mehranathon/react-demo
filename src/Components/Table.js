import { useEffect, useRef} from "react";
import{Stack, Button, Box, TableContainer, Paper,} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";

import PersonAdd from "@mui/icons-material/PersonAdd"


export function UTable({data, fields, selectItem, createNew, sortData, sortBy, showTable, theme}) {


  useEffect(()=>{
    console.log('table rendered')
  })
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

  console.log(ref)

  if(!showTable) return null

  console.log(theme)
  
  return (
    <Box  m="4rem auto 0rem auto" padding="1rem min(5%,6rem)">
      <TableContainer 
        className="User-Container" 
        ref={ref}
        onTransitionEnd={(e)=>{
          console.log(e)
          if(e.target===ref.current)action(selectedItem)}
        }
        // sx={{padding:"0 1rem"}}

        // component={Paper}
        

        >
        <Box bgcolor={theme.palette.action.hover}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            onRowClick={
              (e)=>{
                // console.log(e)
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
  