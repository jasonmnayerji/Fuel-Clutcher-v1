import "./styles.css";
import { MapContainer } from "react-leaflet";
import { Marker } from "react-leaflet";
// import logo from "../../assets/unnamed.png";
import { Popup } from "react-leaflet";
import Media from "./Media";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useMapEvents } from "react-leaflet";
import * as L from "leaflet";
import { useEffect } from "react";
import logo from "../../assets/unnamed.png";

const LeafletMap = (stations) => {
  const lat = stations.coordinates.lat;
  const lng = stations.coordinates.lng;
  const location = [lng, lat];
  const Map = () => {
    const map = useMapEvents("map", {
      zoomControl: false,
    });
    useEffect(() => {
      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {}
      ).addTo(map);
      map.setView(location, 14, 12);
      let locationPopup = L.popup().setContent("You are Here");
      let marker = L.marker(location)
        .bindPopup(locationPopup)
        .addTo(map)
        .openPopup();
    }, []);

    let evIcon = L.icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    stations.stations.features?.map(
      (feature) =>
        L.marker(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
          { icon: evIcon }
        )
          .bindPopup(
            L.popup()
            .setContent(
              `<div>${feature.properties.station_name}</div>`
            )
          )
          .addTo(map)
    );

    // return stations.stations.features?.map((feature) => (
    //   <Marker
    //     key={feature.properties.id}
    //     position={[
    //       feature.geometry.coordinates[1],
    //       feature.geometry.coordinates[0],
    //     ]}
    //   >
    //     <Popup>
    //       <Card sx={{ height: 100, width: 100 }}>
    //         <Media />
    //         <CardContent>
    //           <Typography variant="body2" color="text.secondary">
    //             {feature.properties.access_days_time}
    //           </Typography>
    //         </CardContent>
    //       </Card>
    //     </Popup>
    //   </Marker>
    // ));
  };

  return (
    <MapContainer scrollWheelZoom={true}>
      <Map />
      {/* <EvMarkers /> */}
    </MapContainer>
  );
};

export default LeafletMap;
