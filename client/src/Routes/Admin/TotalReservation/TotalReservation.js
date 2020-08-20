import React, { useEffect, useState } from "react";
import axios from "axios";
import classnames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import MovieCreationOutlinedIcon from "@material-ui/icons/MovieCreationOutlined";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    backgroundColor:"#D3F2DC",
    color:"#FFF",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: green[500],
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: "rgb(26, 26, 26)",
  },
  differenceValue: {
    color: green[700],
  },
}));

function TotalReservation() {
  const classes = useStyles();
  const [ReservationCount, setReservationCount] = useState(0);

  useEffect(() => {
    axios
      .post("/api/reservation/getList")
      .then(response => {
        if (response.data.success) {
          setReservationCount(response.data.doc.length);
        } else {
          alert("실패");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Card className={classnames(classes.root)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              TOTAL RESERVATION
            </Typography>
            <Typography variant="h3">{ReservationCount}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MovieCreationOutlinedIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TotalReservation;