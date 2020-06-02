import React, { Component } from 'react';
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import Right from '../nav/right.component';

const useStyles = makeStyles({
    circle: {
      borderRadius: "50%",
    },
});

export default function About() {
    const classes = useStyles();
    return (
        <div>
            <h1>ABOUT SECTION</h1>
            <Grid container direction="row" alignItems="center" spacing={3}>
                <Grid item xs={12} sm={6}> 
                    <img className={classes.circle} src="./images/pic1.jpg" alt="Pic of food"/>
                </Grid>
                <Grid item xs={12} sm={6}> <h2>Text 1</h2> </Grid>

                <Grid item xs={12}> <br/> </Grid>

                <Grid item xs={12} sm={6}> <h2>Text 2</h2> </Grid>
                <Grid item xs={12} sm={6}> <img className={classes.circle} src="./images/pic2.jpg" alt="Pic of food"/> </Grid>
                <Grid item xs={12}> <br/> </Grid>
            </Grid>
            <br/>
        </div>
    )
}
