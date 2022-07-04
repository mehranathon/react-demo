import { useEffect, useState } from 'react';
import './App.css';
import { Table} from './Components/Table';
import Form from './Components/Form'




 function App() {
  const [error, setError] = useState(null)
  const [activeItem,setActiveItem]=useState({});
  const [newItem,setNewItem]=useState(false);
  const [data,setData]=useState([]);
  const [sortBy,setSortBy]=useState({});
  const [fields,setFields]=useState(['id','username','name'])     //using state to allow for user to change fields displayed on table; at moment this will also affect form

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
  }


  function createNew(){
    setNewItem(true)
    setActiveItem({id:data.reduce((a,b)=>a<b.id?b.id:a,0)+1})
  }

  function sortData(field){
    console.log(field)
    const sData=[...data]
    const nSort={
      field,
      asc:sortBy?.field===field?!sortBy.asc:true,
    }

    sData.sort((a,b)=>{
      if(!nSort) {console.log('no sort'); return sData}
      if (nSort.asc) return a[nSort.field]<b[nSort.field]?-1:1;
      else return a[nSort.field]>b[nSort.field]?-1:1;
    })

    setSortBy(nSort)
    setData(sData)
  }

  function save(eItem){
    const svData=[]
    if(newItem){
      svData.push(...data,eItem)
    }
    else{
      svData.push(...data.map(item=>item.id===eItem.id?eItem:item))
    }
    setNewItem(false)
    setData(svData)
  }
  function del(dItem){
    setData(data.filter(item=>item.id!==dItem.id))
    setActiveItem({})
  }
  function back(){
    setNewItem(false)
    setActiveItem({})
  }

  if(error){
    return <div>Error: {error.message}</div>
  }else if(data.length){
    return (
      <div className="App">
        <Table {...{data, fields, selectItem, createNew, sortData}} />
        <Form {...{activeItem, fields, back, save, del}}/>
      </div>
    );
  }
}

export default App;

