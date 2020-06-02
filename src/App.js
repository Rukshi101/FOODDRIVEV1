import React, { Component } from 'react';
import {BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

import Header from "./components/nav/appbar.component";
import Home from "./components/home/home.component";
import SignUp from "./components/signup.component";
import LogIn from "./components/login.component";
import Footer from "./components/footer.component";

class App extends Component {
  render() {
    return (
      <Router>
          <Header/>
          <br/>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={LogIn} />
          <Footer />
      </Router>
    );
  }
}

export default App;
