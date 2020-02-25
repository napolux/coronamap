import React from "react";
import { Map, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "./App.css";

interface DataMarker {
  "region": string;
  "coords": { "lat": number, "lng": number };
  "cases": number;
  "deads": number;
}

export default function App() {

  const data: DataMarker[] = require('./data.json');
  return (
    <div className="mapContainer">
      <Map center={[41.90, 12.50]} zoom={5}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map(e => (
          <CircleMarker center={[e.coords.lat, e.coords.lng]} fillColor="red" color="red" radius={(Math.log(e.cases) * 5) + 5}>
            <Popup><h3>{e.region}</h3><strong>Casi:</strong> {e.cases} <br /><strong>Morti:</strong> {e.deads}</Popup>
          </CircleMarker>
        ))}
      </Map>
      <div className="ideaContainer">Un'idea di <a rel="noopener noreferrer" href="https://napolux.com" target="_blank">Francesco Napoletano</a></div>
    </div>
  );
}

