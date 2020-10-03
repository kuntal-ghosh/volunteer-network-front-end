import React from "react";
import MyEvent from "../../components/MyEvents/MyEvent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const MyEvents = () => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.root} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item md={6}>
            <MyEvent />
          </Grid>
          <Grid item md={6}>
            <MyEvent />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MyEvents;
