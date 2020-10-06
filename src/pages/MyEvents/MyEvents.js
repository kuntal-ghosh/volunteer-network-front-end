import React, { useEffect, useState, useContext } from "react";
import MyEvent from "../../components/MyEvents/MyEvent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import userContext from "../../Context/userContext";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const MyEvents = () => {
  const classes = useStyles();
  const [loginUser, setLoginUser] = useContext(userContext);
  const [user, setUser] = useState([]);
  const [childUser, setChildUser] = useState({});

  const history = useHistory();

  useEffect(() => {
    async function getuser() {
      let result = await (
        await fetch(
          `https://volunteernetworkbackend.herokuapp.com/api/volunteers/${loginUser.displayName}`
        )
      ).json();
      if (result.length > 0) {
        console.log(result);
        setUser(result);
      }
    }

    getuser();
  }, [childUser]);
  return (
    <>
      {loginUser && loginUser.email?(
        <Container className={classes.root} maxWidth="md">
          <Grid container spacing={4}>
            {user &&
              user.map((user) => (
                <Grid item md={6}>
                  <MyEvent user={user} setUser={setChildUser} />
                </Grid>
              ))}
          </Grid>
        </Container>
      ):
      history.replace("/signin")
      }
    </>
  );
};

export default MyEvents;
