import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Grid, useMediaQuery } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Right from "./right.component"

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container direction="row" alignItems="center">

          <Grid item xs={0} sm={1} md={2}></Grid>

          <Grid item xs={12} sm={10} md={8}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <Typography> food drive </Typography>
              <Right />
            </div>
          </Grid>

          <Grid item xs={0} sm={1} md={2}></Grid>

        </Grid>
      </Toolbar>
  </AppBar>
  );
};

