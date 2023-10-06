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
        <Modal style={{ zIndex: 1000 }}>
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
          </ol>
          <h2 style={{ textAlign: "center" }}> Some specific guidelines for using your EV effectively:</h2>
          <ol>
            <li><strong>Utilize Regenerative Braking:</strong> Take advantage of regenerative braking systems in your EV. They capture energy during braking and convert it back into electricity, improving efficiency.
</li>
<li><strong>Avoid Rapid Acceleration:</strong> Sudden and rapid acceleration can reduce your EV's efficiency. Try to accelerate smoothly and anticipate stops to minimize energy waste.
</li>
<li><strong>Limit Use of Energy-Intensive Features:</strong> Minimize the use of energy-intensive features such as high-beam headlights, audio systems, and seat heaters when not needed.
</li>
<li><strong>Drive Smoothly:</strong> Smooth and gradual driving can help maintain efficiency. Avoid sudden stops and starts when possible.
</li>
<li><strong>Battery Temperature:</strong> Charging can generate heat in the battery, especially at higher charging rates. Allowing the battery to cool down slightly helps maintain its optimal operating temperature, which is beneficial for long-term battery health.
</li>
<li><strong>Stabilization:</strong> After charging, the battery's state of charge (SOC) may need a brief period to stabilize. Waiting for a few minutes ensures that the SOC readings are accurate.
</li>
<li><strong>Efficiency:</strong> Starting your journey with a slightly cooled-down battery can improve energy efficiency and potentially extend your driving range.
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
