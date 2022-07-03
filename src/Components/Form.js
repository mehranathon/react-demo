import { createRef } from "react"

function Form(props){

    const fields=['id','username','name']
    const entries=new Map([...fields.map((field)=>[`${field}`,createRef(null)])])
    const refs=Object.fromEntries(entries)

    return(
        <div className='Form'>
            {fields.map((field,ind)=>{
                return (
                    <label key={field}>
                        {field}
                        <input
                            key={props.activeItem.id}
                            ref={refs[field]}
                            defaultValue={props.activeItem[field]||''}
                            disabled={field==='id'?true:false}
                            type={field==='id'?'number':'text'}
                            // onChange={()=>{
                
                            // }}
                        />

                    </label>
                )
            })}

        <div className="btn-bar">
        <button>Back</button>
        <button
            onClick={
                ()=>{
                    const eItem=props.activeItem
                    for(const ref in refs){
                        if(ref!=='id') eItem[ref]=refs[ref].current.value
                    }
                    props.save(eItem)
                }
            }
        >
        Save
        </button>
        <button
            onClick={
                ()=>{
                    const dItem=props.activeItem
                    props.del(dItem)

                }
            }
        >Delete</button>
        

        </div>
            

        </div>
    )

}

export default Form