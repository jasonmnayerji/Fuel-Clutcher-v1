// API Call To Elecrtic
import axios from "axios";

const URL =
  "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.geojson";
export const getStationData = async (radius, evConnectorType, coordinates) => {
  try {
    const data = axios.get(URL, {
      params: {
        api_key: process.env.REACT_APP_ELECTRIC_API_KEY,
        longitude: coordinates.lng,
        latitude: coordinates.lat,
        fuel_type: "ELEC",
        limit: "200",
        radius: radius,
        ev_connector_type: evConnectorType,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
