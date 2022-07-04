import { createRef } from "react"

function Form({activeItem, fields, save, del, back, showForm}){

    const entries=new Map([...fields.map((field)=>[`${field}`,createRef(null)])])
    const refs=Object.fromEntries(entries)

    const saveItem=()=>{
        const eItem=activeItem
        for(const ref in refs){
            if(ref!=='id') eItem[ref]=refs[ref].current.value
        }
        save(eItem)
    }
    const delItem=()=>del(activeItem)
    const goBack=()=>back()

    if(!showForm) return null

    return(
        <div className='Form'>
            {fields.map((field,ind)=>{
                return (
                    <label key={field}>
                        {field}
                        <input
                            key={activeItem.id}
                            ref={refs[field]}
                            defaultValue={activeItem[field]||''}
                            disabled={field==='id'?true:false}
                            type={field==='id'?'number':'text'}
                            // onChange={()=>{
                
                            // }}
                        />

                    </label>
                )
            })}

        <div className="btn-bar">
        <button onClick={goBack}>Back</button>
        <button onClick={saveItem}>Save</button>
        <button onClick={delItem}>Delete</button>
        </div>
            

        </div>
    )

}

export default Form