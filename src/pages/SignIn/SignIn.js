import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SocialLoginButton from "../../components/SignIn/Social_Login_Button/Social_Login_Button";
import { sizing } from "@material-ui/system";
import userContext from "../../Context/userContext";
import * as firebase from "../../services/firebase.auth";
import { useLocation, useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [loginUser, setLoginUser] = useContext(userContext);
  const [loggedUser, setLoogedUser] = useState({});
  const location = useLocation();

  const history = useHistory();
  let { from } = location.state || { from: { pathname: "/" } };
  console.log("from");
  console.log(from);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}

        <img
          src="/logos/Group 1329.png"
          alt=""
          style={{ height: "50px", marginBottom: "20px" }}
        />
        {/* <Typography component="h1" variant="h5">
          Sign up
        </Typography> */}
        <Box
          display="flex"
          justify="center"
          alignItems="center"
          minWidth="400px"
          minHeight="400px"
          style={{ border: "1px solid rgba(0,0,0,0.2)" }}
          padding="20px"
          borderRadius="5px"
        >
          <Grid
            container
            direction="column"
            //   justify="center"
            //   alignItems="center"
            style={
              {
                //   paddingTop: "30px",
              }
            }
            spacing={2}
          >
            <Grid item xs={12} justify="center">
              <Typography component="h2" variant="title" align="center">
                Login With
              </Typography>
            </Grid>

            <Grid item xs={12} onClick={googleSignIN}>
              <SocialLoginButton
                imageUrl="/images/google.png"
                buttonText="Continue with Google"
              ></SocialLoginButton>
            </Grid>
            <Grid item xs={12} justify="center">
              <Typography component="p" align="center">
                Don't have an account?
                <Link href="#" variant="body2">
                  Sign Up
                </Link>
              </Typography>
            </Grid>
            {/* onClick={googleSignIN} */}
          </Grid>
        </Box>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );

  async function googleSignIN() {
    console.log("google clicked");
    // let newUser = { ...loggedUser };

    try {
      const { user } = await firebase.signinWithGoogle();
      console.log(user);
      if (user) {
        
        console.log(user);

        // newUser.password = user.password;
        // setloggedInUser(user);

        setLoginUser(user);
        // setUser(newUser);
        setLoogedUser(user);
        console.log("logged in");
        console.log(user);
        console.log(from);
        // authenticate();
        history.replace(from);
      }
    } catch (e) {
      console.log(e.message);
      // newUser.error.message = e.message;
      // setUser(newUser);
    }
  }
}
