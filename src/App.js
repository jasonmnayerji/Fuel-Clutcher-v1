import "./App.css";
import { CssBaseline, Grid } from "@mui/material";

import List from "./components/List/List";
import Header from "./components/Header/Header";
import React, { useState, useEffect } from "react";
import { getStationData } from "./api";
import LeafletMap from "./components/Map/LeafletMap";

const App = () => {
  const [gridState, setGridState] = useState("none");
  const [mapState, setMapState] = useState(12);

  const [headerColor, setHeaderColor] = useState("success.light");

  const [stations, setStations] = useState({});

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const [radius, setRadius] = useState("5.0");
  const [fuelType, setFuelType] = useState("");

  const [evConnectorType, setEvConnectorType] = useState("all");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { longitude, latitude } }) => {
        setCoordinates({ lat: longitude, lng: latitude });
      }
    );
  }, []);

  useEffect(() => {
    getStationData(
      radius,
      evConnectorType,
      coordinates.lng,
      coordinates.lat
    ).then(({ data }) => {
      setStations(data);
    });
  }, [fuelType, radius, coordinates, evConnectorType]);

  return (
    <>
      <CssBaseline />
      <Header
        setCoordinates={setCoordinates}
        headerColor={headerColor}
        setMapState={setMapState}
        setGridState={setGridState}
      />
      <Grid container style={{ width: "100%" }}>
        <Grid Style={`display: ${gridState}`} item xs={12} md={4}>
          <List
            setHeaderColor={setHeaderColor}
            stations={stations}
            fuelType={fuelType}
            setFuelType={setFuelType}
            radius={radius}
            setRadius={setRadius}
            evConnectorType={evConnectorType}
            setEvConnectorType={setEvConnectorType}
          />
        </Grid>
        <Grid item xs={12} md={mapState}>
          <LeafletMap stations={stations} coordinates={coordinates} />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
