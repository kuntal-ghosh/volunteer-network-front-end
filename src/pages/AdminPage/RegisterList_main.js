import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  paper: {
    borderRadius: "10px",
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function RegisterListMain() {
  const classes = useStyles();

  const [volunteers, setVolunteers] = useState([]);
  const [afterDelete, setAfterDelete] = useState({});
  useEffect(() => {
    async function getVolunteers() {
      let result = await (
        await fetch(
          "https://volunteernetworkbackend.herokuapp.com/api/volunteers"
        )
      ).json();
      if (result.length > 0) {
        setVolunteers(result);
      }
    }

    try {
      getVolunteers();
    } catch (error) {
      console.log(error);
    }
    // return () => {
    //   cleanup
    // }
  }, [afterDelete]);

  return (
    <Container maxWidth="lg">
      <TableContainer component={Paper} className={classes.paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Event </TableCell>
              <TableCell>Action </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volunteers.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.event.title}</TableCell>
                <TableCell style={{ cursor: "pointer", color: "tomato" }}>
                  <DeleteIcon onClick={() => handleDelete(row._id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );

  async function handleDelete(id) {
    try {
      let result = await fetch(
        "https://volunteernetworkbackend.herokuapp.com/api/volunteers/delete/" +
          id,
        {
          method: "DELETE",
        }
      );

      if (result) {
        setAfterDelete({});
      }
    } catch (error) {
      console.log(error);
    }
  }
}
