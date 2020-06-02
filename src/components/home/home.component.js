import React, { Component } from 'react';
import { Grid } from "@material-ui/core"

import Splash from "./splash.component";
import About from "./about.component";
import DonationMap from "./donationmap.component";

export default function Home() {
    return (
        <div>
            <Splash />
            <Grid container direction="row">
                <Grid item xs={0} sm={1} md={2}></Grid>
                <Grid item xs={12} sm={10} md={8}>
                    <About />
                    <DonationMap />
                </Grid>
                <Grid item xs={0} sm={1} md={2}></Grid>
            </Grid>
        </div>
        
    )
}
