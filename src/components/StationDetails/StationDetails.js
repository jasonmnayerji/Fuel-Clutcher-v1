import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { Divider, Link } from "@mui/material";
import logo from "../../assets/unnamed.png";

const StationDetails = ({ feature, selected, refProp }) => {
  if (selected) {
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  const constructAddress = () => {
    let [address, city, state] = [
      feature.properties.street_address,
      feature.properties.city,
      feature.properties.state,
    ];
    return `${address} ${city} ${state}`;
  };

  const HandleNumbers = () => {
    if (!feature.properties.station_phone) {
      return;
    }
    const number = feature.properties.station_phone;
    const numbers = number.split(" ");
    // const removeEmpty = numbers.filter((val) => val);
    return (
      <Box pt={0} display="flex" justifyContent="space-between">
        <Typography variant="body2">
          <img
            width={20}
            alt="phone"
            src="https://www.freeiconspng.com/thumbs/phone-icon/phone-icon-png--clipart-best-17.png"
          />
        </Typography>
        <Link
          href="#"
          onClick={() => {
            window.open(`tel:${numbers[0]}`);
          }}
        >
          <Typography
            sx={{
              "&:hover": {
                color: "primary.main",
              },
            }}
            color="text.secondary"
            variant="h7"
          >
            {numbers[0]}
          </Typography>
        </Link>
      </Box>
    );
  };
  return (
    <Card
      variant="elevation"
      sx={{
        m: 2,
        "&:hover": {
          boxShadow: "3px 3px 5px 6px #ccc",
        },
      }}
    >
      <CardMedia
        component="img"
        height="100"
        image={logo}
        alt="random station"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {feature.properties.station_name}
        </Typography>
        <Box pt={2} display="flex" justifyContent="space-between">
          <Typography variant="body2" color="text.secondary">
            {feature.properties.access_days_time}
          </Typography>
        </Box>
        <Divider sx={{ pt: 1 }} />
        <Box pt={2} display="flex" justifyContent="space-between">
          <Typography variant="h7">
            <img
              width={20}
              alt="location pin"
              src="https://cdn-icons-png.flaticon.com/512/67/67347.png"
            />
            {Math.round(feature.properties.distance * 100) / 100} mi
          </Typography>
          <Typography color="text.secondary" variant="h7">
            {constructAddress()}
          </Typography>
        </Box>
        <HandleNumbers />
        <Box pt={0} display="flex" justifyContent="space-between">
          <Typography variant="body2">Access Type</Typography>
          <Typography color="text.secondary" variant="h7">
            {feature.properties.access_code}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            feature.properties.ev_network_web === null
              ? alert("Nothing to show!")
              : window.open(feature.properties.ev_network_web);
          }}
          size="small"
        >
          Learn More
        </Button>
        <Button
          onClick={() => {
            window.open(
              "https://maps.google.com?q=" +
                feature.geometry.coordinates[1] +
                "," +
                feature.geometry.coordinates[0]
            );
          }}
          size="small"
        >
          Directions
        </Button>
      </CardActions>
    </Card>
  );
};

export default StationDetails;
