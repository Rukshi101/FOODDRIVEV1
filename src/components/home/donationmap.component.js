import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default class DonationMap extends Component {
  /*
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get("http://localhost:5000/exercises")
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExercise(id) {
    axios.delete("http://localhost:5000/exercises/"+id)
      .then(res => console.log(res.data));
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }
  */
  state = {
    loc: {
      lat: 43.5890,
      lng: -79.6441,
    },
    zoom: 13
  }

  render(){
    return (
      <div className="mapCont">
        <Map className="map" center={this.state.loc} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
        <br/>
      </div>
    );
  }

}
