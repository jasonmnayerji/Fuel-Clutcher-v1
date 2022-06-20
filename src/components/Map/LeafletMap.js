import "./styles.css";
import { MapContainer } from "react-leaflet";
import { Marker } from "react-leaflet";
// import logo from "../../assets/unnamed.png";
import { Popup } from "react-leaflet";
import Media from "./Media";
import { Card, CardContent, Typography } from "@mui/material";
import { useMapEvents } from "react-leaflet";
import * as L from "leaflet";
import { useEffect } from "react";

const LeafletMap = (stations, coordinates) => {
  const Map = () => {
    const map = useMapEvents("map", {
      zoomControl: false,
    });
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20,
    }).addTo(map);

    map.locate({ setView: true, watch: true, maxZoom: 10 });
    let locationFoundIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    let marker;
    let locationPopup = L.popup().setContent("You are Here");
    map.on("locationfound", (e) => {
      if (!marker) {
        marker = L.marker(e.latlng, { icon: locationFoundIcon })
          .bindPopup(locationPopup)
          .addTo(map)
          .openPopup();
      } else {
        marker.setLatLng(e.latlng);
      }
    });
  };

  const EvMarkers = () => {
    return stations.stations.features?.map((feature) => (
      <Marker
        key={feature.properties.id}
        position={[
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0],
        ]}
      >
        <Popup>
          <Card sx={{ height: 100, width: 100 }}>
            <Media />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {feature.properties.access_days_time}
              </Typography>
            </CardContent>
          </Card>
        </Popup>
      </Marker>
    ));
  };
  return (
    <MapContainer scrollWheelZoom={true}>
      <Map />
      <EvMarkers />
    </MapContainer>
  );
};

export default LeafletMap;
