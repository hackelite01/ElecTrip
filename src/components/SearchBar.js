import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchBar({ setLoc, placeholder }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const API_KEY = "z6DIYeUVZ6oFAYoGIfL2AYS6uLuUi7sdLIoTFuALy3o";

  const fetchResults = async (query) => {
    const apiEndpoint = `https://autosuggest.search.hereapi.com/v1/autosuggest?at=52.93175,12.77165&limit=3&lang=en&q=${query}&apiKey=${API_KEY}`;
    const res = await fetch(apiEndpoint);
    const data = await res.json();
    const options = data.items.map((item) => {
      return { label: item.title, position: item.position };
    });
    setOptions(options);
  };

  const handleInputChange = async (e) => {
    const query = e.target.value;
    if (query) {
      await fetchResults(query);
    }
  };

  return (
    <Autocomplete
      filterOptions={(x) => x}
      // freeSolo
      value={value}
      onChange={(e, newValue) => {
        setValue(newValue);
        setLoc(newValue ? `${newValue.position.lat},${newValue.position.lng}`: '');
      }}
      inputValue={inputValue}
      onInputChange={(e, newInputValue) => {
        setInputValue(newInputValue);
        handleInputChange(e);
      }}
      options={options}
      fullWidth
      renderInput={(params) => <TextField {...params} label={placeholder} />}
    />
  );
}
