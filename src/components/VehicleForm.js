import { useState } from "react";
import SocSlider from "./SocSlider";
import TextField from "@mui/material/TextField";

export default function VehicleForm({ setSoc, setBatteryCapacity }) {
  const [maxCapacity, setMaxCapacity] = useState("");

  const handleCapacityChange = (e) => {
    const enteredValue = e.target.value;
    const numericValue = parseFloat(enteredValue);

    // Check if the entered value is a valid number and within the specified range
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 80) {
      setBatteryCapacity(numericValue);
      setMaxCapacity(numericValue);
    } else {
      // If not a valid number or outside the range, prompt the user
      alert("Please enter a valid number between 0 and 80 kWh");
      // Optionally, you may reset the input value to the previous valid value
      e.target.value = maxCapacity;
    }
  };

  return (
    <div className="input-form">
      <div>
        <TextField
          id="outlined-basic"
          type="number"
          label="Battery Capacity in kWh"
          variant="outlined"
          InputProps={{ inputProps: { min: 15, max: 80 } }}
          onChange={handleCapacityChange}
          fullWidth
        />
      </div>
      <div>
        <SocSlider setSoc={setSoc} maxCapacity={maxCapacity} />
      </div>
    </div>
  );
}
