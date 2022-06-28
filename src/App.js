import "./App.css";
import { CssBaseline, Grid } from "@mui/material";
import List from "./components/List/List";
import Header from "./components/Header/Header";
import { useState, useEffect } from "react";
import { getStationData } from "./api";
import LeafletMap from "./components/Map/LeafletMap";

const App = () => {
  const [gridState, setGridState] = useState("none");
  const [mapState, setMapState] = useState(12);
  const [stations, setStations] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [radius, setRadius] = useState("");
  const [evConnectorType, setEvConnectorType] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { longitude, latitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (coordinates === null) {
      return;
    }
    getStationData(radius, evConnectorType, coordinates).then(({ data }) => {
      setStations(data);
    });
  }, [radius, evConnectorType, coordinates]);

  return (
    <>
      <CssBaseline />
      <Header
        setCoordinates={setCoordinates}
        setMapState={setMapState}
        setGridState={setGridState}
      />

      {coordinates && stations ? (
        <Grid container style={{ width: "100%" }}>
          <Grid Style={`display: ${gridState}`} item xs={12} md={4}>
            <List
              stations={stations}
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
      ) : null}
    </>
  );
};

export default App;
