import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

export default function SocSlider({ setSoc, maxCapacity }) {
  const [value, setValue] = useState(30);
  const Input = styled(MuiInput)`
    width: 42px;
  `;
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setSoc(newValue * maxCapacity / 100)
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
    setSoc(event.target.value === "" ? "" : (Number(event.target.value) * maxCapacity / 100))
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };
  return (
    <Box>
      <br/>
      <br/>
      <Typography id="input-slider" gutterBottom>
        Current Charging Status
      </Typography>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            variant="outlined"
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
