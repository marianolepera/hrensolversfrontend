import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Swal from 'sweetalert2';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {withRouter} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link,useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../reducers/authSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const history = useHistory()
  const dispatch = useDispatch()
  //const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
      Swal.fire({
        icon: 'success',
        title: 'Log Out Success',
        showConfirmButton: false,
        timer: 2000
      })
    history.push('/login')
    dispatch(reset())
    
  }

  

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

//   const handleLogout = () => {
//     localStorage.setItem("token","");
//     Swal.fire({
//       icon: 'success',
//       title: 'Log Out Success',
//       showConfirmButton: false,
//       timer: 2000
//     })
//     props.history.push("/login") ;
//   };

  return (
    <div className={classes.root}>
      
      <AppBar position="static">
        <Toolbar>
            
            <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ color: "#FFF", textDecoration: "none" }}>
                ENSOLVERS
            </Link>
            </Typography>
            
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                
                <MenuItem onClick={onLogout}>Log Out</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);