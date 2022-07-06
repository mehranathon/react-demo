import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import {ReactComponent as Logo} from "../AF_Logo.svg"


function TopNav(){

    return(
        <AppBar position="fixed">
            <Toolbar>
            <div className="AF-Logo">
                <Logo />
            </div>

            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                USERS
            </Typography>

            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
            >
                <MenuIcon />
            </IconButton>

            </Toolbar>
        </AppBar>
    )
}


export default TopNav