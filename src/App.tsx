import React from "react";
import { Map, TileLayer, CircleMarker, Popup, ZoomControl, LayerGroup } from "react-leaflet";
import "./App.css";

interface DataMarker {
  "region": string;
  "coords": { "lat": number, "lng": number };
  "cases": number;
  "recoveries": number;
  "deads": number;
}

export default function App() {

  const data: DataMarker[] = require('./data.json');
  return (
    <>
      <div className="ideaContainer">
        <h3>COVID19 Italia: 5 Marzo 2020, ore 18.00</h3>
        <p>Un'idea di <a rel="noopener noreferrer" href="https://twitter.com/napolux" target="_blank">Francesco Napoletano</a></p>
        <p>Sorgente dati: <a rel="noopener noreferrer" target="_blank" href="http://www.salute.gov.it/nuovocoronavirus">salute.gov.it</a></p>
      </div>
      <div className="mapContainer">
        <Map center={[41.90, 12.50]} zoom={5} zoomControl={false}>
          <ZoomControl position="bottomleft" />
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LayerGroup>
            {data.map(e => (
              <>
                <CircleMarker center={[e.coords.lat, e.coords.lng]} fillColor="red" color="red" radius={(Math.log(e.cases) * 5) + 5}>
                  <Popup><h3>{e.region}</h3><strong>Casi:</strong> {e.cases}<br /><strong>Guarigioni:</strong> {e.recoveries || 0}<br /><strong>Morti:</strong> {e.deads || 0}</Popup>
                </CircleMarker>
                <CircleMarker center={[e.coords.lat, e.coords.lng]} fillColor="blue" color="blue" radius={(Math.log(e.recoveries) * 5) + 5}>
                  <Popup><h3>{e.region}</h3><strong>Casi:</strong> {e.cases}<br /><strong>Guarigioni:</strong> {e.recoveries || 0}<br /><strong>Morti:</strong> {e.deads || 0}</Popup>
                </CircleMarker>
              </>))}
          </LayerGroup>
        </Map>
      </div>
    </>);
}

