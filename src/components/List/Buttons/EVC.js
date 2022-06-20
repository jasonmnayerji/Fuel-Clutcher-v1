import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

const EVC = ({ evConnectorType, setEvConnectorType }) => {
  return (
    <FormControl
      variant="standard"
      sx={{
        m: 2,
        minWidth: { xs: 100, md: 160 },
        mx: { xs: 5, md: 2 },
      }}
    >
      <InputLabel>EVC Type</InputLabel>
      <Select
        value={evConnectorType}
        onChange={(e) => setEvConnectorType(e.target.value)}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="NEMA1450">NEMA 14-50</MenuItem>
        <MenuItem value="NEMA515">NEMA 5-15</MenuItem>
        <MenuItem value="NEMA520">NEMA 5-20</MenuItem>
        <MenuItem value="J1772">J1772</MenuItem>
        <MenuItem value="J1772COMBO">CCS</MenuItem>
        <MenuItem value="CHADEMO">CHAdeMO</MenuItem>
        <MenuItem value="TESLA">Tesla</MenuItem>
      </Select>
    </FormControl>
  );
};
export default EVC;
