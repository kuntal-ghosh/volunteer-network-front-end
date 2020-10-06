import React, { useEffect, useState, useContext } from "react";
import MyEvent from "../../components/MyEvents/MyEvent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import userContext from "../../Context/userContext";
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

  useEffect(() => {
    async function getuser() {
      let result = await (
        await fetch(
          `https://volunteernetworkbackend.herokuapp.com/api/volunteers/${loginUser.displayName}`
        )
      ).json();

      console.log(result);
      setUser(result);
    }

    getuser();
  }, [loginUser,user]);
  return (
    <>
      <Container className={classes.root} maxWidth="md">
        <Grid container spacing={4}>
          {user &&
            user.map((user) => (
              <Grid item md={6}>
                <MyEvent user={user} setUser={setUser} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default MyEvents;
