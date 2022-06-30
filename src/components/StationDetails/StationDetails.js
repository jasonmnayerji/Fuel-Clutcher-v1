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
          <Typography color="text.secondary" variant="h9">
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
          <Link
            href="#"
            onClick={() => {
              console.log(
                window.open(`tel:${feature.properties.station_phone}`)
              );
            }}
          >
            <Typography
              sx={{
                "&:hover": {
                  color: "primary.main",
                },
              }}
              color="text.secondary"
              variant="h9"
            >
              {!feature.properties.station_phone
                ? "No Number Found"
                : feature.properties.station_phone}
            </Typography>
          </Link>
        </Box>
        <Box pt={0} display="flex" justifyContent="space-between">
          <Typography variant="body2">Access Type</Typography>
          <Typography color="text.secondary" variant="h9">
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
