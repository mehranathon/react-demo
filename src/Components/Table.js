import { useEffect, useMemo, useState } from "react";

export function Table(props) {
  console.log(props)
  const [data,setData]=useState(props.value)
  
  // I don't know if this is ok
  if(data.length!==props.value.length) setData(props.value)

  const selectItem=props.selectItem
  const [sortBy,setSortBy]=useState(null)


  useEffect(()=>{
    // console.log(data)
  },[])

  

  let sData=[...data]
    sData.sort((a,b)=>{
    if(!sortBy) return
    if (sortBy.asc){
      return a[sortBy.field]<b[sortBy.field]?-1:1
    }else{
      return a[sortBy.field]>b[sortBy.field]?-1:1
    }
  })

  // useMemo(()=>{
  //   let sData=[...data]
  //   sData.sort((a,b)=>{
  //     if(!sortBy) return
  //     if (sortBy.asc){
  //       if(a[sortBy.field]<b[sortBy.field]) return -1
  //       if(a[sortBy.field]>b[sortBy.field]) return 1
  //       return 0
  //     }else{
  //       if(a[sortBy.field]<b[sortBy.field]) return 1
  //       if(a[sortBy.field]>b[sortBy.field]) return -1
  //       return 0
  //     }

  //   })
    
  // },[data,sortBy])
  

  return (
    <div className="Table-Container">
      <button onClick={()=>props.createNew()}>Add</button>  
      <table className="Table">
        <thead>
          <tr>
            <th 
              onClick={()=>setSortBy(
                {
                field:'id',
                asc:sortBy?.field==='id'?!sortBy.asc:true
                })}>
                ID
            </th>
            <th 
              onClick={()=>setSortBy({
                field:'username', 
                asc:sortBy?.field==='username'?!sortBy.asc:true
                })}>
                USERNAME
            </th>
            <th 
              onClick={()=>setSortBy({
                field:'name',
                asc:sortBy?.field==='name'?!sortBy.asc:true
                })}>
                NAME
            </th>
          </tr> 
        </thead>
        <tbody>
          {sData.map(item=>
            <tr
              key={item.id}
              onClick={()=>{
                selectItem(item)
                }}
            >
              <td>
                {item.id}
              </td>
              <td>
                {item.username}
              </td>
              <td>
                {item.name}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  
}
  