import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const markers = [
  { key: 'marker1', position: [43.2, -79.5], content: 'My first popup' },
  { key: 'marker2', position: [43.6, -79.7], content: 'My second popup' },
  { key: 'marker3', position: [43.55, -79.57], content: 'My third popup' },
];

const MyMarkersList = ({ markers }: { markers: Array<MarkerData> }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ))
  return <Fragment>{items}</Fragment>
}

const MyPopupMarker = ({ content, position }: Props) => (
  <Marker position={position}>
    <Popup>{content}</Popup>
  </Marker>
)

export default class DonationMap extends Component {
  constructor(props) {
    super(props);

    this.createMarkers = this.createMarkers.bind(this);

    this.state = {
      loc: {
        lat: 43.5890,
        lng: -79.6441,
      },
      zoom: 13
    }

    for(let marker in markers) {
      console.log(marker.key);
    }
  }

  componentDidMount() {
    /*
    axios.get("http://localhost:5000/exercises")
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
    */
    this.setState({
      ...this.state,
      markers: [
        { key: 'marker1', position: [43.2, -79.5], content: 'My first popup' },
        { key: 'marker2', position: [43.6, -79.7], content: 'My second popup' },
        { key: 'marker3', position: [43.55, -79.57], content: 'My third popup' },
      ],
    });
  }


  createMarkers() {
    
    let returnArray = this.state.markers.map(
      curr => {
        return (
          <Marker position={curr.position}>
            <Popup>{curr.content}</Popup>
          </Marker>
        )
      }
    )
  }

  render(){
    return (
      <div className="mapCont">
        <Map className="map" center={this.state.loc} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MyMarkersList markers={markers}/>
        </Map>
        <br/>
      </div>
    );
  }

}
