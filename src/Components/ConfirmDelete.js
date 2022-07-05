import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material/"
import { useState } from "react"


export default function ConfirmDelete({item,open,confirm,reject}){
    // const [open, setOpen]= useState(false)

    // const handleClickOpen = () => {
    //     setOpen(true)
    // }

    // const handleClickClose = () => {
    //     setOpen(false)
    // }

    return(
        <Dialog
            open={open}
            // onClose={handleClose}
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete user {`[${item.id}] ${item.username}`}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={confirm}>Yes</Button>
                <Button onClick={reject}>No</Button>
            </DialogActions>
        </Dialog>
    )
}