import { Divider, Grid, Typography } from "@mui/material";
import EVC from "./Buttons/EVC";
import Radius from "./Buttons/Radius";
import { useEffect, createRef, useState } from "react";
import StationDetails from "../StationDetails/StationDetails";

const List = ({
  radius,
  setRadius,
  stations,
  evConnectorType,
  setEvConnectorType,
  hoverId,
}) => {
  const [elRef, setElRef] = useState([]);
  const features = stations.features;
  useEffect(() => {
    const ref = Array(features.length)
      .fill()
      .map((_, i) => elRef[i] || createRef());
    setElRef(ref);
  }, [features]);

  return (
    <div style={{ padding: "25px" }}>
      <Typography
        sx={{ display: { xs: "none", sm: "block" }, fontFamily: "Segoe UI" }}
        variant="h4"
      >
        Fuel Stations Near You
      </Typography>
      <Divider sx={{ pt: 1, display: { xs: "none", sm: "block" } }} />

      <Radius radius={radius} setRadius={setRadius} />

      <EVC
        evConnectorType={evConnectorType}
        setEvConnectorType={setEvConnectorType}
      />
      <Grid container style={{ height: "75vh", overflow: "auto " }}>
        {features?.map((feature, i) => (
          <Grid ref={elRef[i]} item key={feature.properties.id} xs={12}>
            <StationDetails
              feature={feature}
              selected={hoverId === feature.properties.id}
              refProp={elRef[i]}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default List;
