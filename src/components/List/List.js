import { Divider, Grid, Typography } from "@mui/material";
import EVC from "./Buttons/EVC";
import Radius from "./Buttons/Radius";
import FuelType from "./Buttons/FuelType";
import StationDetails from "../StationDetails/StationDetails";

const List = ({
  setHeaderColor,
  radius,
  setRadius,
  stations,
  fuelType,
  setFuelType,
  evConnectorType,
  setEvConnectorType,
}) => {
  const features = stations.features;

  return (
    <div style={{ padding: "25px" }}>
      <Typography
        sx={{ display: { xs: "none", sm: "block" }, fontFamily: "Segoe UI" }}
        variant="h4"
      >
        Fuel Stations Near You
      </Typography>
      <Divider sx={{ pt: 1, display: { xs: "none", sm: "block" } }} />
      <FuelType
        setHeaderColor={setHeaderColor}
        fuelType={fuelType}
        setFuelType={setFuelType}
      />
      <Radius radius={radius} setRadius={setRadius} />
      {fuelType === "Electric" && (
        <EVC
          evConnectorType={evConnectorType}
          setEvConnectorType={setEvConnectorType}
        />
      )}
      <Grid container style={{ height: "75vh", overflow: "auto " }}>
        {features?.map((feature) => (
          <Grid item xs={12}>
            <StationDetails feature={feature} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default List;
