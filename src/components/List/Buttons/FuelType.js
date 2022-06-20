import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const FuelType = ({ fuelType, setFuelType, setHeaderColor }) => {
  return (
    <FormControl
      variant="standard"
      sx={{ m: 2, minWidth: 100, mx: { xs: 5, md: 2 } }}
    >
      <InputLabel>Fuel Type</InputLabel>
      <Select
        value={fuelType}
        onChange={(e) => {
          setFuelType(e.target.value);
          e.target.value === "Gas"
            ? setHeaderColor("warning.main")
            : setHeaderColor("success.light");
        }}
      >
        <MenuItem value="Gas">Gas</MenuItem>
        <MenuItem value="Electric">Electric</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FuelType;
