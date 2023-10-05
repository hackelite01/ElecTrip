import { useState } from "react";

// components
import SearchBar from "./components/SearchBar";
import TripItinerary from "./components/TripItinerary";
import VehicleForm from "./components/VehicleForm";
import MapView from "./components/MapView";
import Modal from "./components/Modal";

// material UI component
import Button from "@mui/material/Button";

import "./App.css";
export default function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [soc, setSoc] = useState(null);
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [route, setRoute] = useState(null);
  const [buttonText, setButtonText] = useState("Calculate Route");
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageClass, setMessageClass] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const API_KEY = "z6DIYeUVZ6oFAYoGIfL2AYS6uLuUi7sdLIoTFuALy3o";

  const handleClick = async () => {
    setIsDisabled(true);
    setButtonText("Calculating route...");
    const url = `https://router.hereapi.com/v8/routes?apiKey=${API_KEY}&transportMode=car&origin=${origin}&destination=${destination}&return=summary,polyline&ev[freeFlowSpeedTable]=0,0.239,27,0.239,45,0.259,60,0.196,75,0.207,90,0.238,100,0.26,110,0.296,120,0.337,130,0.351,250,0.351&ev[makeReachable]=true&ev[initialCharge]=${soc}&ev[maxCharge]=${batteryCapacity}&ev[chargingCurve]=0,239,32,199,56,167,60,130,64,111,68,83,72,55,76,33,78,17,80,1&ev[maxChargeAfterChargingStation]=${
      batteryCapacity * 0.9
    }&ev[connectorTypes]=chademo,iec62196Type1Combo,iec62196Type2Combo,tesla`;

    const res = await fetch(url);
    const data = await res.json();
    if (data.notices) {
      console.log(data);
      // setMessage("error!");
      setMessage(data.notices[0].title);
      setMessageClass("error");
      return;
    }
    setRoute(data);
    setMessage("Route calculated successfully!");
    setMessageClass("success");
  };

  const handleReload = () => {
    window.location.reload(false);
  };

  const handleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <div className="App">
      <header className="header">
        <i className="fa-regular fa-circle-question" onClick={handleModal}></i>
        <div>ElecTrip</div>
      </header>
      <div className="container">
        <div className="column column-1">
          <div className="form">
            <div className="input-form">
              <SearchBar setLoc={setOrigin} placeholder={"Origin"} />
              <SearchBar setLoc={setDestination} placeholder={"Destination"} />
            </div>
            <VehicleForm
              setSoc={setSoc}
              setBatteryCapacity={setBatteryCapacity}
            />

            {message ? (
              <>
                <div className={messageClass}>{message}</div>
                <Button
                  className="button"
                  onClick={handleReload}
                  variant="contained"
                >
                  Try again!
                </Button>
              </>
            ) : (
              <Button
                className="button"
                onClick={handleClick}
                variant="contained"
                disabled={isDisabled}
              >
                {buttonText}
              </Button>
            )}
          </div>
          <div className="column-1-item mapview">
            {route ? <MapView route={route} /> : "Route will appear here"}
          </div>
        </div>

        {route ? (
          <div className="column overflow-auto itinerary">
            <TripItinerary route={route} batteryCapacity={batteryCapacity} />
          </div>
        ) : (
          <div className="column column-2 overflow-auto itinerary">
            Trip Itinerary will appear here
          </div>
        )}
      </div>
      {showModal && (
        <Modal style="z-index: 1000;">
          <h2 style={{ textAlign: "center" }}>How to use ElecTrip</h2>
          <ol>
            <li>
              Enter the name of place in <strong>Origin</strong> and{" "}
              <strong>Destination</strong> respectively.
            </li>
            <li>Enter the total battery capacity of your vehicle in kWh.</li>
            <li>
              Enter the inital state of charge of your vehicle at start of the
              journey.
            </li>
            <li>
              Click <strong>Calculate Route</strong> button to get the Map and
              Itinerary of the journey!
            </li>
            <li>
              Use the WebApp by refreshing everytime to get updated Data.
            </li>
                <li>
                To book the charging station, Mail us your vehicle number and contact number, CS name.
                </li>
                <li>
                ©️ Team Vidhyut - ElecTrip 📧 hackelite.sup@gmail.com 
                </li>
          </ol>
          
          <button
            onClick={handleModal}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#a5f3fc",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}
