import React, { Component } from "react";
import { useMediaQuery, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TemporaryDrawer from "./drawbutton.component"

export default function Right(props) {
    const isActive = useMediaQuery('(min-width: 750px)');
    return (
        <div>
        {   isActive
            ? <Buttons/>
            : <MenuButton/>
        }
        </div>
    )
}
  
class Buttons extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loggedIn: false,
        }
    }
    
    componentDidMount() {
    // logic to see if user is logged in
    let isLoggedIn = false;
    this.setState(prevState => {
        return {
            loggedIn: isLoggedIn
        }
    })
    }

    render() {
        return (
            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", }}>
                <Typography style={{padding:".5em"}}>donate</Typography>
                <Typography style={{padding:".5em"}}>trip</Typography>
                <div style={{paddingLeft:".5em"}}>
                    { this.state.loggedIn
                        ? <Link to="/logout" > <Button variant="contained" color="secondary">Logout</Button> </Link>
                        : <Link to="/login" > <Button variant="contained" color="primary">Login</Button> </Link>
                    }
                </div>
            </div>
        )
    }
}


class MenuButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loggedIn: false,
        }
    }
    
    componentDidMount() {
    // logic to see if user is logged in
    let isLoggedIn = false;
    this.setState(prevState => {
        return {
            loggedIn: isLoggedIn
        }
    })
    }

    render() {
        return (
            <TemporaryDrawer loggedIn={this.state.loggedIn}/>
        )
    }
}
