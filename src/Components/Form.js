import { createRef, useRef, useState} from "react"
import {TextField, Box, Stack, IconButton} from "@mui/material"
import {Save, PersonRemove, ArrowBack} from '@mui/icons-material'
import ConfirmDelete from "./ConfirmDelete"

function Form({activeItem, validator, setValid, fields, save, del, back, showForm}){

    const entries=new Map([...fields.map((field)=>[`${field.field}`,createRef(null)])])
    const refs=Object.fromEntries(entries)

    const formRef=useRef(null)
    const [dialogOpen,setOpen]=useState(false)

    const saveItem=()=>{
        const eItem=activeItem
        for(const ref in refs){
            if(ref!=='id') eItem[ref]=refs[ref].current.value
        }
        save(eItem)
    }
    const delItem=()=>del(activeItem)
    const goBack=()=>back()

    const fadeOut=()=>{formRef.current.classList.add('fade-out')}

    const [action, setAction]= useState('null')

    // let action=null

    if(!showForm) return null

    return(
        <Box
            component="form"
            display="flex"
            flexDirection="column"
            maxWidth="50rem"
            m="4rem auto 0rem auto"
            padding="1rem"

            sx={{
                '& .MultiTextField-root':{m:1, width:'25ch'}
            }}
            noValidate
            autoCompelte="off"
            className="User-Form"
            ref={formRef}
            onTransitionEnd={
                (e)=>{
                    if(e.target===formRef.current){
                        if(action==='back') goBack()
                        if(action==='save') saveItem()
                        if(action==='delete') delItem()
                    }
                }    
            }
        >
            {fields.map(({field, fieldType},ind)=>{
                return (
                        <TextField
                            key={field}
                            inputRef={refs[field]}
                            disabled={field==='id'?true:false}
                            type={field==='id'?'number':'text'}
                            label={field.toUpperCase()}
                            defaultValue={activeItem[field]||''}
                            margin="normal"
                            error={!validator[field]}
                            onChange={
                                (e)=>{
                                    const val=refs[field].current.value
                                    const newValidator={...validator}
                                    if(!validate(fieldType,val) && newValidator[field]) {
                                        newValidator[field]=false
                                        setValid(newValidator)
                                    }
                                    if(validate(fieldType,val) && !newValidator[field]){
                                        newValidator[field]=true
                                        setValid(newValidator)
                                    }
                                }}
                        />
                )
            })}

            <Stack spacing ={2} direction="row" justifyContent="space-around" m="1rem 0 0 0">
                <IconButton
                    color="primary"
                    aria-label="back"
                    onClick={()=>{setAction('back');fadeOut()}}
                >
                    <ArrowBack fontSize="large" />
                </IconButton>
                <IconButton
                    color="primary"
                    aria-label="save"
                    onClick={()=>{setAction('save');fadeOut()}}
                    disabled={Object.values(validator).includes(false)}
                >
                    <Save fontSize="large" />
                </IconButton>
                <IconButton
                    color="primary"
                    aria-label="delete"
                    onClick={()=>{setOpen(true)}}
                >
                    <PersonRemove fontSize="large" />
                </IconButton>
            </Stack>

            <ConfirmDelete
                item={activeItem}
                open={dialogOpen}
                confirm={
                    ()=>{
                        setAction('delete')
                        setOpen(false)
                        fadeOut()
                    }
                }
                reject={()=>{setOpen(false)}}
            />

        </Box>
    )

}

export default Form

const validate=function(fieldType,val){

    if(fieldType==='username'){
        //based on provided dataset; no special characters except periods and underscores
        const allowed=/^[a-zA-Z0-9äöüÄÖÜ._]*$/
        return (
            allowed.test(val)
            && val.length>2
            && val.length<257
            )
    }
    if(fieldType==='name'){
        //requires name to be romanized; some East Asian cultures have mononymic full names (single syllable) 
        const allowed=/^[a-zA-Z0-9äöüÄÖÜ._\s]*$/
        return (
            allowed.test(val)
            && val.length>1
            && val.length<257
            )
    }
    if(fieldType==='email'){
        //email addresses vary wildly; it's advised that validation be conducted through a confirmation email 
        return (
            val.split('@')[0]?.length>0
            && val.split('@')[1]?.length>0
        )
    }
    // if(fieldType==='phone'){
    //     return cleanPhoneNum(val).length>9
    // }

    if(fieldType==='zipCode'){
        return (!isNaN(val) && (val.length===0||val.length===5))
        // return cleanPhoneNum(val).length>9
    }
    if(['street','city'].includes(fieldType)){
        const forbidden=/[~`!#_$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g; // eslint-disable-line  
        return !forbidden.test(val)

    }
    return true

}