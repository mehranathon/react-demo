import { AppBar, IconButton, Toolbar } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
// import MenuIcon from '@mui/material/Icon'
import Typography from "@mui/material/Typography"
import SvgIcon from "@mui/material/SvgIcon"
import {ReactComponent as Logo} from "../AF_Logo.svg"
import { makeStyles } from "@mui/material/styles"

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
                // sx={{mr:2}}
            >
                <MenuIcon />
            </IconButton>
            {/* <img src={"AF_Logo.svg"}>

            </img> */}

            </Toolbar>
        </AppBar>
    )
}


export default TopNav