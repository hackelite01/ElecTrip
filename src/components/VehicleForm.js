import { useState } from "react";
import SocSlider from "./SocSlider";
import TextField from "@mui/material/TextField";

export default function VehicleForm({ setSoc, setBatteryCapacity }) {
  const [maxCapacity, setMaxCapacity] = useState("");

  return (
    <div className="input-form">
      <div>
      <TextField
        id="outlined-basic"
        type="number"
        label="Battery Capacity in kWh"
        variant="outlined"
        InputProps={{ inputProps: { min: 0, max: 80 } }}
        onChange={(e) => {
          setBatteryCapacity(e.target.value);
          setMaxCapacity(e.target.value);
        }}
        fullWidth
      />
      </div>
      <div>
      <SocSlider setSoc={setSoc} maxCapacity={maxCapacity} />
      </div>
      
    </div>
  );
}
