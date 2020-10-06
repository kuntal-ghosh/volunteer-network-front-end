import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "100%",
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  cancel: {
    display: "flex",
    alignItems: "flex-end",
    alignContent: "end",
    cursor: "pointer",
    // padding :"10px"
    // backgroundColor: "rgba(0,0,0,0.5)",
    "& .MuiTypography-subtitle1": {
      padding: "5px 10px",
      backgroundColor: "rgba(0,0,0,0.1)",
      borderRadius: "5px",
      transition: "background-color",
      transitionDuration: "0.3s",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.2)",
      },
    },
  },
}));

export default function MyEvents({ event }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={`/images/${event.image}.png`}
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {event.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {event.date}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.description}
                </Typography>
              </Grid>
              {/* <Grid item>
                <Typography variant="body2" style={{ cursor: "pointer" }}>
                  Remove
                </Typography>
              </Grid> */}
            </Grid>
            <Grid item className={classes.cancel}>
              <Typography element="p" variant="subtitle1">
                Cancel
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
