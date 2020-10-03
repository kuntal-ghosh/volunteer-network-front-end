import React, { useRef, useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CameraIcon from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  root: {
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
    backgroundColor: "red",
    color: "black",
  },
}));
const NavBar = () => {
  const [navBackGround, setNavBackGround] = useState("backgroundTransparent");
  const classes = useStyles();
  const appRef = useRef(null);
  appRef.current = navBackGround;

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
  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes[appRef.current]}>
          <Toolbar>
            <CameraIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Album layout
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default NavBar;
