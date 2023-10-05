import { useState, useEffect } from "react";
import { reverseGeoCode } from "../utils/reverseGeoCode";
import TripStops from "./TripStops";
import { secondsToHms } from "../utils/secondToHms";
import TripSummary from "./TripSummary";

export default function TripItinerary({ route, batteryCapacity }) {
  const sections = route.routes[0].sections;

  const [places, setPlaces] = useState([]);
  const [distance, setDistance] = useState(null);
  const [stops, setStops] = useState(null);
  const [eta, setEta] = useState(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      let results = [];
      let totalDistance = 0;
      let totalDuration = 0;
      for (let section of sections) {
        const place = await reverseGeoCode(section.arrival.place.location);
        const time = new Date(section.arrival.time);
        let chargingTime;
        let arrivalCharge;
        let targetCharge;
        if (section.postActions) {
          chargingTime = section.postActions[0].duration;
          arrivalCharge =
            Math.round((section.postActions[0].arrivalCharge / batteryCapacity) * 100);
          targetCharge =
            Math.round((section.postActions[0].targetCharge / batteryCapacity) * 100);
        } else {
          arrivalCharge = section.arrival.charge;
        }
        results.push({
          place,
          time,
          chargingTime,
          arrivalCharge,
          targetCharge,
        });
        totalDistance += section.summary.length / 1000;
        totalDuration += section.summary.duration;
      }

      const totalEta = secondsToHms(totalDuration);
      setPlaces(results);
      setDistance(Math.round(totalDistance));
      setStops(sections.length - 1);
      setEta(totalEta);
    };

    fetchPlaces();

    return () => setPlaces([]);
  }, [sections, eta, batteryCapacity]);

  // Function to handle booking
  const handleBook = () => {
    const vehicleNumber = prompt("Enter Vehicle Number:");
    const mobileNumber = prompt("Enter Mobile Number:");

    if (vehicleNumber && mobileNumber) {
      // Perform actions with the collected data, e.g., send it to a server
      // You can also update state or display a message to the user
      console.log("Vehicle Number:", vehicleNumber);
      console.log("Mobile Number:", mobileNumber);
    } else {
      // Handle case when the user cancels the prompt or leaves it empty
      console.log("Booking canceled or incomplete.");
    }
  };

  return (
    <div className="container-itinerary">
      <TripSummary tripSummary={{ distance, stops, eta }} />
      <h2>Trip Stops</h2>
      <ol>
        {places &&
          places.map((place) => (
            <li key={Math.random()} className="stop-item">
              <TripStops stop={place} />
            </li>
          ))}
      </ol>
    </div>
  );
}
