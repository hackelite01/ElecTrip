import { secondsToHms } from "../utils/secondToHms";

export default function TripStops({ stop }) {
  return (
    <div className="container-stop">
      <div className="centered">
        {stop.chargingTime ? (
          <div className="centered">
            <i class="fa-solid fa-charging-station"></i>
            <p>{secondsToHms(stop.chargingTime)}</p>
          </div>
        ) : (
          <div className="centered">
            <i class="fa-solid fa-map-pin loc-pin"></i>
            <p>Destination</p>
          </div>
        )}
      </div>

      <div className="place">
        <p className="loc-charging">{stop.place}</p>
        <p>Arrival charge: {stop.arrivalCharge} %</p>
        {stop.targetCharge && <p>Target charge: {stop.targetCharge} %</p>}
      </div>

      <div className="centered">
        <h3>Arrive by</h3>
        <p>
          {`${stop.time.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}, ${stop.time.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}`}
        </p>
      </div>
    </div>
  );
}
