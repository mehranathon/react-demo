import { useEffect} from "react";

export function Table({data, fields, selectItem, createNew, sortData}) {


  useEffect(()=>{
    console.log('table rendered')
  })
  
  return (
    <div className="Table-Container">
      <button onClick={()=>createNew()}>Add</button>  
      <table className="Table">
        <thead>
          <tr>
          {fields.map(field=>{
            return(
              <th
                onClick={()=>{
                  sortData(field)
                }}
                key={field}
              >
              {field}
              </th>
            )
          })}
          </tr> 
        </thead>
        <tbody>
          {data.map(item=>
            <tr
              key={item.id}
              onClick={()=>{
                selectItem(item)
                }}
            >
              {fields.map(field=><td key={item.id+field}>{item[field]}</td>)}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  
}
  