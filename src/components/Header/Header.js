import { Toolbar, IconButton, Typography, AppBar, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useCallback, useState } from "react";
import logo from "../../assets/unnamed.png";
import { Search, SearchIconWrapper, StyledInputBase } from "./styles";
import { Autocomplete } from "@react-google-maps/api";

export default function Header({ setGridState, setMapState, setCoordinates }) {
  const [toggleState, setToggleState] = useState(true);
  const [autocomplete, setAutocomplete] = useState(null);

  const handleMenuClick = useCallback(() => {
    if (toggleState === true) {
      setGridState("");
      setMapState(8);
    } else {
      setGridState("none");
      setMapState(12);
    }
    setToggleState((state) => !state);
  }, [toggleState]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ bgcolor: "success.light" }} position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              <img
                src={logo}
                alt="logo!"
                style={{
                  maxWidth: 30,
                  marginRight: "10px",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="h1"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Fuel Clutcher
            </Typography>
            <Typography
              variant="h7"
              sx={{ pr: 2, display: { xs: "none", sm: "block" } }}
            >
              Locate Fuel Stations
            </Typography>
            <Autocomplete
              onLoad={(autoC) => {
                setAutocomplete(autoC);
              }}
              onPlaceChanged={() => {
                const lat = autocomplete.getPlace().geometry.location.lng();
                const lng = autocomplete.getPlace().geometry.location.lat();
                setCoordinates({ lng: lat, lat: lng });
              }}
            >
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Autocomplete>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
