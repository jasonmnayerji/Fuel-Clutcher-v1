import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
const Radius = ({radius, setRadius}) => {
  return (
    <FormControl variant="standard" sx={{ m: 2, minWidth: 100 }}>
      <InputLabel>Radius</InputLabel>
      <Select value={radius} onChange={(e) => setRadius(e.target.value)}>
        <MenuItem value="1.0">1 mi</MenuItem>
        <MenuItem value="2.0">2 mi</MenuItem>
        <MenuItem value="3.0">3 mi</MenuItem>
        <MenuItem value="4.0">4 mi</MenuItem>
        <MenuItem value="5.0">5 mi</MenuItem>
      </Select>
    </FormControl>
  );
};
export default Radius;
