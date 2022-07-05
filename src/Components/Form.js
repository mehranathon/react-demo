import { createRef, useRef } from "react"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

function Form({activeItem, fields, save, del, back, showForm}){

    const entries=new Map([...fields.map((field)=>[`${field}`,createRef(null)])])
    const refs=Object.fromEntries(entries)

    const formRef=useRef(null)

    const saveItem=()=>{
        const eItem=activeItem
        for(const ref in refs){
            console.log(refs[ref])
            if(ref!=='id') eItem[ref]=refs[ref].current.value
        }
        save(eItem)
    }
    const delItem=()=>del(activeItem)
    const goBack=()=>back()

    const fadeOut=()=>{formRef.current.classList.add('fade-out')}

    let action=null

    if(!showForm) return null

    return(
        <Box
            component="form"
            display="flex"
            flexDirection="column"
            maxWidth="50rem"
            m="5rem auto 0rem auto"
            padding="1rem"

            sx={{
                '& .MultiTextField-root':{m:1, width:'25ch'}
            }}
            noValidate
            autoCompelte="off"
            className="User-Form"
            ref={formRef}
            onTransitionEnd={(e)=>{if(e.target===formRef.current)action()}}
        
        >
            {fields.map((field,ind)=>{
                console.log(activeItem.id)
                return (
                        <TextField
                            key={field}
                            inputRef={refs[field]}
                            disabled={field==='id'?true:false}
                            type={field==='id'?'number':'text'}
                            label={field.toUpperCase()}
                            defaultValue={activeItem[field]||''}
                            margin="normal"

                            // onChange={()=>{
                
                            // }}
                        />
                )
            })}

            <Stack spacing ={2} direction="row" justifyContent="space-evenly">
                <Button variant="contained" onClick={()=>{action=goBack;fadeOut()}}>Back</Button>
                <Button variant="contained" onClick={()=>{action=saveItem;fadeOut()}}>Save</Button>
                <Button variant="contained" onClick={()=>{action=delItem;fadeOut()}}>Delete</Button>
            </Stack>
            

        </Box>
    )

}

export default Form