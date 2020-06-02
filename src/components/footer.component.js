import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
      <AppBar style={{ top: "auto", bottom: 0,}} position="static">
        <Toolbar>
          <Grid container direction="row" alignItems="center">
  
            <Grid item xs={12}>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Typography> food drive </Typography>
              </div>
            </Grid>
  
            <Grid item xs={12}>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <a className="social-list__link" href="https://codepen.io">
                        <i className="fab fa-codepen"></i>
                    </a>
                    <a className="social-list__link" href="http://dribbble.com">
                        <i className="fab fa-dribbble"></i>
                    </a>
                    <a className="social-list__link" href="https://twitter.com">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a className="social-list__link" href="https://github.com">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
              </div>
            </Grid>
  
          </Grid>
        </Toolbar>
    </AppBar>
    );
  };
