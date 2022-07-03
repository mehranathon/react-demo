import { useEffect, useState } from 'react';
import './App.css';
import { Table} from './Components/Table';
import Form from './Components/Form'




 function App() {
  const [error, setError] = useState(null)

  const [activeItem,setActiveItem]=useState({})
  const [newItem,setNewItem]=useState(false)
  const [userData,setUserData]=useState([]);

  useEffect(()=>{
    console.error('first')
    fetch('./mockData.json')
      .then(response=>response.json())
      .then(
        (result)=>{
          setUserData(result)
        },
        (error)=>{
          setError(error)
        }
      )
  },[])

  function selectItem(item){
    if(item.id===activeItem.id) return
    setActiveItem(item)
    console.log(activeItem)
  }
  function save(eItem){
    const udUserdata=[]
    if(newItem){
      udUserdata.push(...userData,eItem)
      console.log(udUserdata)

    }
    else{
      udUserdata.push(...userData.map(item=>item.id===eItem.id?eItem:item))
    }
    setNewItem(false)

    // const udUserdata=userData.map(item=>item.id===eItem.id?eItem:item)
    setUserData(udUserdata)
  }
  function del(dItem){
    setUserData(userData.filter(item=>item.id!==dItem.id))
  }

  function createNew(){
    setNewItem(true)
    console.log(userData)
    // console.log(userData.reduce((a,b)=>a<b.id?b.id:a,0)+1)
    setActiveItem({id:userData.reduce((a,b)=>a<b.id?b.id:a,0)+1})
  }

  function add(nItem){
    console.log(nItem)

  }

  if(error){
    return <div>Error: {error.message}</div>
  }else if(userData.length){
    return (
      <div className="App">
        <Table value ={userData} selectItem={selectItem} createNew={createNew} />
        <Form {...{activeItem,save,add,del}}/>
      </div>
    );
  }



}

export default App;


// async function getData(json){
//   let response

//   await fetch(json)
//   .then(response => response.text())
//   .then(data => {
//       response=JSON.parse(data)
//   });

//   return response
// }

