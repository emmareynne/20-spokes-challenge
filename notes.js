{
  floorsSet && !elevatorDirection &&
  <div>
    <h2>Up or Down?</h2>
    <button value='up' onClick={handleUpClick}>UP</button>
    <button value='down' onClick={handleDownClick}>DOWN</button>
    <h2>Current floor: {currentFloor}</h2>
    <p>Which floor?</p>
    <input type='number' placeholder='Pick A Number'></input>
  </div>
}


{
  elevatorDirection && 
  <div>
    <h2>Going {elevatorDirection}!</h2>
    <p>Please wait for the elevator to reach your floor...</p>
  </div>
}

<h2>The elevator is currently at {Math.floor(currentElevatorFloor)}.</h2>