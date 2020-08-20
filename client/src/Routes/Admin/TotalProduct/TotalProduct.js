import React, { useEffect, useState } from "react";
import axios from "axios";
import classnames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import FastfoodOutlinedIcon from "@material-ui/icons/FastfoodOutlined";
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

function TotalProduct() {
  const classes = useStyles();
  const [ProductCount, setProductCount] = useState(0);

  useEffect(() => {
    axios.get("/api/product/getCountOfProduct").then(response => {
      if (response.data.success) {
        setProductCount(response.data.products.length);
      } else {
        console.log("불러오기 실패");
      }
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
              TOTAL PRODUCT
            </Typography>
            <Typography variant="h3">{ProductCount}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <FastfoodOutlinedIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TotalProduct;