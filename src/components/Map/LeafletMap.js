import "./styles.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMapEvents } from "react-leaflet";
import * as L from "leaflet";

let evIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LeafletMap = ({ stations, coordinates }) => {
  const location = [coordinates.lat, coordinates.lng];
  const Map = () => {
    const map = useMapEvents("map");
    map.setView(location, 12);
  };
  
  return (
    <MapContainer scrollWheelZoom={true}>
      <Map />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <Marker position={location}>
        <Popup>You are here</Popup>
      </Marker>
      {stations.features?.map((feature) => (
        <Marker
          eventHandlers={{
            click: () => {
              window.open(
                "https://maps.google.com?q=" +
                  feature.geometry.coordinates[1] +
                  "," +
                  feature.geometry.coordinates[0]
              );
            },
          }}
          icon={evIcon}
          key={feature.properties.id}
          position={[
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
          ]}
        >
          <Popup></Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
