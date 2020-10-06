import React, { useRef, useEffect, useState, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Box } from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import { Link } from "react-router-dom";
import userContext from "../../Context/userContext";
import * as firebase from "../../services/firebase.auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    // width: "20%",
    // backgroundColor: "none",
    "& .MuiPaper-elevation4": {
      boxShadow: "none",
    },

    "& .MuiAppBar-colorPrimary": {
      // backgroundColor: "transparent",
      // color: "black",
    },
  },

  backgroundTransparent: {
    backgroundColor: "transparent",
    color: "black",
  },
  backgroundColor: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow: 1,
    marginRight: "auto",
  },
  navmenus: {
    display: "flex",
    marginRight: "20px",
  },
  menu: {
    margin: theme.spacing(0, 4),
    cursor: "pointer",
  },
}));
const NavBar = () => {
  const [navBackGround, setNavBackGround] = useState("backgroundTransparent");
  const classes = useStyles();
  const appRef = useRef(null);

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  appRef.current = navBackGround;

  const [loginUser, setLoginUser] = useContext(userContext);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setNavBackGround("backgroundColor");
      } else {
        setNavBackGround("backgroundTransparent");
      }
    }

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    const response = firebase.signout();
    console.log("response delete");
    console.log(response);
    if (response) {
      console.log("response delete");
      console.log(response);
      setLoginUser({});
    }
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes[appRef.current]}>
          <Toolbar>
            <Hidden mdUp>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>{" "}
            </Hidden>

            <Typography
              variant="h6"
              className={classes.title}
              style={{ cursor: "pointer" }}
            >
              <img src="/logos/Group 1329.png" alt="logo" width="200px" />
            </Typography>
            <Hidden mdDown>
              <Box className={classes.navmenus}>
                <Typography variant="h6" className={classes.menu}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Home
                  </Link>
                </Typography>{" "}
                <Typography variant="h6" className={classes.menu}>
                  Donation
                </Typography>{" "}
                <Typography variant="h6" className={classes.menu}>
                  Evaents
                </Typography>{" "}
                <Typography variant="h6" className={classes.menu}>
                  Blog
                </Typography>{" "}
                <Typography variant="h6" className={classes.menu}>
                  Register
                </Typography>{" "}
                <Typography variant="h6" className={classes.menu}>
                  <Link
                    to="/admin"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Admin
                  </Link>
                </Typography>
              </Box>
              {loginUser && loginUser.displayName ? (
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
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>My Events</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Menu>
                </div>
              ) : (
                <Typography variant="h6" className={classes.menu}>
                  <Link
                    to="/signin"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Login
                  </Link>
                </Typography>
              )}
            </Hidden>
            {/* <div>
              <Typography variant="h6" className={classes.title}>
                <img src="/logos/Group 1329.png" alt="logo" width="100px" />
              </Typography>
            </div> */}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default NavBar;
