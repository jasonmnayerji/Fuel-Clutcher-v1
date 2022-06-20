import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { auto } from "@popperjs/core";
import { useState } from "react";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import logo from "../../assets/unnamed.png";

const StationDetails = ({ setStationCoordinates, feature }) => {
  const [bgColor, setBgColor] = useState("");

  const handleStationName = () => {
    return feature.properties.station_name;
  };

  const constructAddress = () => {
    let [address, city, state] = [
      feature.properties.street_address,
      feature.properties.city,
      feature.properties.state,
    ];
    return `${address} ${city} ${state}`;
  };

  return (
    <Card
      onMouseOver={() => setBgColor("text.disabled")}
      onMouseOut={() => setBgColor("")}
      sx={{ maxWidth: auto, m: 2, backgroundColor: bgColor }}
    >
      <CardMedia
        component="img"
        height="100"
        image={logo}
        alt="random station"
      />
      <CardContent>
        <Typography gutterbottom variant="h5" component="div">
          {handleStationName()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {feature.properties.access_days_time}
        </Typography>
        <Divider sx={{ pt: 1 }} />
        <Box pt={2} display="flex" justifyContent="space-between">
          <Typography variant="h9">
            <img
              width={20}
              alt="location pin"
              src="https://cdn-icons-png.flaticon.com/512/67/67347.png"
            />
          </Typography>
          <Typography gutterBottom color="text.secondary" variant="h9">
            {constructAddress()}
          </Typography>
        </Box>
        <Box pt={0} display="flex" justifyContent="space-between">
          <Typography variant="body2">
            <img
              width={20}
              alt="phone"
              src="https://www.freeiconspng.com/thumbs/phone-icon/phone-icon-png--clipart-best-17.png"
            />
          </Typography>
          <Typography gutterBottom color="text.secondary" variant="h9">
            {feature.properties.station_phone}
          </Typography>
        </Box>{" "}
        <Box pt={0} display="flex" justifyContent="space-between">
          <Typography variant="body2">Access Type</Typography>
          <Typography gutterBott om color="text.secondary" variant="h9">
            {feature.properties.access_code}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button
          onClick={() => {
            window.open(feature.properties.ev_network_web);
          }}
          size="small"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default StationDetails;
