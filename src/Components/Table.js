import { useEffect, useRef} from "react";
import Box from "@mui/material/Box"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"



export function UTable({data, fields, selectItem, createNew, sortData, sortBy, showTable, theme}) {


  useEffect(()=>{
    console.log('table rendered')
    console.log(theme)
  })

  const ref=useRef(null)
  let action=null
  let selectedItem={}
  const fadeOut=()=>{
    ref.current.classList.add("fade-out")
  }

  if(!showTable) return null
  
  return (
    <Box  m="5rem auto 0rem auto" padding="1rem">
      <TableContainer 
        className="User-Container" 
        ref={ref}
        onTransitionEnd={(e)=>{if(e.target===ref.current)action(selectedItem)}}
        sx={{padding:"1rem"}}
        >
        <Stack spacing ={2} direction="row" justifyContent="flex-end">
          <Button variant="contained" onClick={()=>{action=createNew;fadeOut()}}>Add</Button>  
        </Stack>
        <Table sx={{ minWidTableCell:650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          {fields.map(field=>{
            return(
              <TableCell
                onClick={()=>{
                  sortData(field)
                }}
                className={`hover-cell ${sortBy.field===field?sortBy.asc?'asc':'desc':''}`}
                key={field}
              >
              {field.toUpperCase()}
              </TableCell>
            )
          })}
          </TableRow> 
        </TableHead>
        <TableBody>
          {data.map(item=>
            <TableRow
              className="User-Table-Row"
              key={item.id}
              hover
              sx={{
                cursor:"pointer"
              }}
              onClick={()=>{
                action=selectItem
                selectedItem=item
                fadeOut()
                }}
            >
              {fields.map(field=><TableCell key={item.id+field}>{item[field]}</TableCell>)}
            </TableRow>
          )}
        </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
  
}
  