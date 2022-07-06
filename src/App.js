import { useEffect, useState, useMemo } from 'react';
import './App.css';
import TopNav from './Components/TopNav';
import {UTable} from './Components/Table';
import Form from './Components/Form'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material';
import CssBaseline from "@mui/material/CssBaseline";




 function App() {
  const prefersDarkMode=useMediaQuery('(prefers-color-scheme: dark)')

  const theme=useMemo(
    ()=>
      createTheme({
        palette:{
          mode: prefersDarkMode ? 'dark' : 'light',
          primary:{
            main: "#3842ff"
          },
          // background:{
          //   default:prefersDarkMode?'#20203e':''
          // }
          
        },
      }),
    [prefersDarkMode]
    );
  
  const [error, setError] = useState(null)
  const [activeItem,setActiveItem]=useState({});
  const [newItem,setNewItem]=useState(false);
  const [data,setData]=useState([]);
  const [showForm,setShowForm]=useState(false)
  const [showTable,setShowTable]=useState(true)

  const fields=[
    {
      field:'id',
      fieldType:'id',
      label:'ID'
    },
    {
      field:'username',
      fieldType:'username',
      label:'USERNAME'
    },
    {
      field:'name',
      fieldType:'name',
      label:'NAME'
    },
    {
      field: 'email',
      fieldType:'email',
      label:'EMAIL'
    }
  ]

  const [validator, setValid]=useState(Object.fromEntries(new Map([...fields.map(field=>[field.field,false])])))

  useEffect(()=>{
    console.warn('first')
    fetch('./mockData.json')
    .then(response=>response.json())
    .then(
      (result)=>{
        setData(result)
      },
      (error)=>{
        setError(error)
      }
    )
  },[])


  function selectItem(item){
    if(item.id===activeItem.id) return
    setActiveItem(item)
    setValid(Object.fromEntries(new Map([...fields.map(field=>[field.field,true])])))                     //assumes existing items in database are validated
    setShowTable(false)
    setShowForm(true)

  }
  function createNew(){
    setNewItem(true)
    setActiveItem({id:data.reduce((a,b)=>a<b.id?b.id:a,0)+1})
    setValid(Object.fromEntries(new Map([...fields.map(({field})=>[field,field==='id'?true:false])])))
    setShowTable(false)
    setShowForm(true)
  }
  function save(eItem){
    console.log(eItem)
    const svData=[]
    if(newItem){
      svData.push(...data,eItem)
    }
    else{
      svData.push(...data.map(item=>item.id===eItem.id?eItem:item))
    }
    setNewItem(false)
    setData(svData)
    setShowTable(true)
    setShowForm(false)
  }
  function del(dItem){
    setData(data.filter(item=>item.id!==dItem.id))
    setActiveItem({})
    setShowTable(true)
    setShowForm(false)
  }
  function back(){
    setNewItem(false)
    setActiveItem({})
    setShowTable(true)
    setShowForm(false)
  }

  if(error){
    return <div>Error: {error.message}</div>
  }else if(data.length){
    return (
      <div className="App">

      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <TopNav />
      
        <UTable {...{data, fields, selectItem, createNew, showTable, theme}} />
        <Form {...{activeItem, validator, setValid, fields, back, save, del,  showForm, theme}}/>
        </ThemeProvider>
      </div>
      
    );
  }
}

export default App;

