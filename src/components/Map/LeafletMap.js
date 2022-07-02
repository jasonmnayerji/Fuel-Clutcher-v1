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

const LeafletMap = ({ stations, coordinates, setHoverId }) => {
  const location = [coordinates.lat, coordinates.lng];
  const MapView = () => {
    const map = useMapEvents("map");
    map.setView(location);
  };
  console.log(stations);
  return (
    <MapContainer zoom={12} center={location} scrollWheelZoom={true}>
      <MapView />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <Marker position={location}>
        <Popup>You are here</Popup>
      </Marker>
      {stations.features?.map((feature) => (
        <Marker
          key={feature.properties.id}
          eventHandlers={{
            mouseover: () => {
              setHoverId(feature.properties.id);
            },
          }}
          icon={evIcon}
          position={[
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0],
          ]}
        >
          <Popup>
            <div Style="text-align: center">
              <div>{feature.properties.station_name}</div>
              <div>
                {Math.round(feature.properties.distance * 100) / 100} mi
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
