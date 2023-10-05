import "./TripSummary.css";

export default function TripSummary({ tripSummary }) {
  // return (
  //   <div>
  //     <h2 style={{marginTop: 0}}>Trip Summary</h2>
  //     <div className='trip-summary'>
  //       <div>
  //         <h3>Distance</h3>
  //         <p>{tripSummary.distance} km</p>
  //       </div>

  //       <div>
  //         <h3>ETA</h3>
  //         <p>{tripSummary.eta}</p>
  //       </div>

  //       <div>
  //         <h3>Stops</h3>
  //         <p>{tripSummary.stops}</p>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="midMid">
      <div class="midMid1">
        <div class="topHead">
          <h1>Trip Summary</h1>
        </div>
        <ul>
          <li>
            <h3>{tripSummary.distance} km</h3>
            <p>Distance</p>
          </li>
          <li>
            <h3>{tripSummary.eta}</h3>
            <p>ETA</p>
          </li>
          <li>
            <h3>{tripSummary.stops}</h3>
            <p>Stops</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
