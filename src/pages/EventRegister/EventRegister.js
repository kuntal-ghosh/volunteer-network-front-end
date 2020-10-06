import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
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
import userContext from "../../Context/userContext";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";
import { useHistory } from "react-router-dom";

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

export default function EventRegister() {
  const classes = useStyles();
  const history = useHistory();

  const [eventData, setEventData] = useState({
    name: "",
    email: "",
    date: new Date(),
    description: "",
    event: {},
    error: {},
  });
  console.log("eventData");
  console.log(eventData);
  const [loginUser, setLoginUser] = useContext(userContext);
  const [events, setEvents] = useState({});
  const { _id } = useParams();

  useEffect(() => {
    async function getEvent() {
      try {
        const event = await (
          await fetch(
            `https://volunteernetworkbackend.herokuapp.com/api/events/findone/${_id}`
          )
        ).json();
        if (event) {
          setEvents(event);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getEvent();

    // return () => {
    //   cleanup
    // }
  }, []);
  console.log("EVENTSSSS");
  console.log(events);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}

        <img
          src="/logos/Group 1329.png"
          alt=""
          style={{ height: "50px", marginBottom: "10px" }}
        />
        {/* <Typography component="h1" variant="h5">
          Sign up
        </Typography> */}
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                value={loginUser.displayName}
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={loginUser.email}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  required
                  // disableToolbar
                  variant="inline"
                  // clearLabel
                  autoOk
                  format="L"
                  margin="normal"
                  id="date-picker-inline"
                  label="From"
                  className={classes.datepicker}
                  // value={selectedDate}
                  style={{ paddingRight: 4, width: "100%" }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  name="date"
                  // value={}
                  value={eventData.date}
                  onChange={(date) => handleStartDateChange(date)}

                  // minDate=
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                // variant="outlined"
                // multiline
                // required
                // fullWidth
                // id="description"
                // label="Description"
                name="description"
                // autoComplete="description"
                value={eventData.description}
                onChange={handleChange}
                id="outlined-multiline-static"
                label="Description"
                // required
                multiline
                rows={4}
                // defaultValue="Default Value"
                variant="outlined"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="event"
                label="Event Name"
                name="event"
                autoComplete="event"
                value={events.title}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            {/* <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid> */}
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );

  function handleStartDateChange(date) {
    const newBooking = { ...eventData };
    newBooking.date = date;
    // setBooking(newBooking);
    setEventData(newBooking);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let newEventData = { ...eventData };
    newEventData.email = loginUser.email;
    newEventData.name = loginUser.displayName;
    newEventData.event = events;

    // const newBooking = { ...eventData };
    let errors;
    if (newEventData.error) {
      errors = Object.keys(eventData.error).length > 0;
    }
    if (!errors) {
      try {
        let result = await fetch(
          "https://volunteernetworkbackend.herokuapp.com/api/volunteers/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(newEventData),
          }
        );

        if (result.statusText === "OK") {
          console.log("success");
          console.log(result);

          console.log(result.statusText);

          // let json = result.json();
          // console.log("json");
          // console.log(json);
          history.push(`/my-events/${loginUser.displayName}`);
        }
      } catch (error) {
        console.log("error");
        console.log(error);
      }
      // setBooking(newBooking);
      // setBooked(newBooking);
      // setEventData(newEventData);
    }
  }
  function handleChange(e) {
    const newBooking = { ...eventData };
    if (e.target.value === "") {
      newBooking.error[e.target.name] = `${e.target.name} is required`;
    } else {
      if (newBooking.error) {
        delete newBooking.error[e.target.name];
      }
    }
    newBooking[e.target.name] = e.target.value;
    // setBooking(newBooking);
    setEventData(newBooking);
  }
}
