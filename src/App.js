import react, { useState, useEffect, useCallback } from 'react';
import { SetFloorComponent } from './components/SetFloorComponent/SetFloorComponent.js'

function App() {
  const [currentFloor, setCurrentFloor] = useState(1)
  const [totalFloors, setTotalFloors] = useState(2)
  const [floorsSet, setFloorsSet] = useState(false)
  const [elevatorDirection, setElevatorDirection] = useState(false)
  const [currentElevatorFloor, setCurrentElevatorFloor] = useState()
  const [targetFloor, setTargetFloor] = useState(0)
  const [onElevator, setonElevator] = useState(false)
  const [arrived, setArrived] = useState(false)

  useEffect(() => {
    if (targetFloor === currentFloor) {
      setArrived(true)
      console.log('setting arrived')
    }
  }, [currentElevatorFloor, currentFloor, targetFloor, arrived]);

  const refresh = () => {
    console.log('callback runnign')
    setCurrentElevatorFloor(currentElevatorFloor)
  }

  const handleSaveClick = (e) => {
    e.preventDefault()
    setFloorsSet(!floorsSet)
    const floorChoice = e.target.numFloors.value
    console.log(e.target.getAttribute('name'))
    setTotalFloors(floorChoice)
    const randomFloor = Math.floor(Math.random() * (floorChoice) + 1)
    console.log(randomFloor)
    setCurrentElevatorFloor(randomFloor)
  }

  const handleEditClick = () => {
    setFloorsSet(!floorsSet)
  }

  const handleDownClick = async (e) => {
    setElevatorDirection('up')
    console.log('up')
    await moveElevatorDownWait()
  }

  const handleUpClick = async (e) => {
    setElevatorDirection('down')
    console.log('down')
    await moveElevatorUpWait()
  }

  const handleFloorPicker = (e) => {
    e.preventDefault()
    console.log(e.target.targetFloor.value)
    setTargetFloor(e.target.targetFloor.value)
    if (e.target.targetFloor.value === currentFloor) {
      setArrived(true)
    }
  }

  const getElevatorDistance = () => {
    if (currentElevatorFloor > currentFloor) {
      const elevatorDistance = currentElevatorFloor - currentFloor
      return elevatorDistance
    }
    else if (currentElevatorFloor < currentFloor) {
      const elevatorDistance = currentFloor - currentElevatorFloor
      return elevatorDistance
    } 
    else {
      return 0
    }
  }

  const moveElevatorUp = () => {
    console.log(currentElevatorFloor)
    const nextFloor = currentElevatorFloor + 1
    console.log(nextFloor)
    setCurrentElevatorFloor(nextFloor)
    if (onElevator) {
      setCurrentFloor(nextFloor)
    }
    return nextFloor
  }

  const moveElevatorDown = () => {
    const nextFloor = currentElevatorFloor - 1
    console.log(nextFloor)
    setCurrentElevatorFloor(nextFloor)
    if (onElevator) {
      setCurrentFloor(nextFloor)
    }
    return nextFloor
  }

  const elevatorWait = (x) => new Promise((r) => setTimeout(r, x));

  const moveElevatorDownWait = async () => {
    await (async () => {
      await elevatorWait(1000);
    })();
    await elevatorWait(
      (moveElevatorDown())
    );
  };

  const moveElevatorUpWait = async () => {
    await (async () => {
      await elevatorWait(1000);
    })();
    await elevatorWait(
      (moveElevatorUp())
    );
  };
  

  const moveElevatorOneFloor = async () => {
    if (currentElevatorFloor > currentFloor) {
      const nextFloor = currentElevatorFloor - 1
        await elevatorWait((()=>console.log('hi')), 1000)
        console.log('hello')
      
      console.log('elevator moved down')
      refresh()
    }
    else if (currentElevatorFloor < currentFloor) {
      await elevatorWait(moveElevatorUp())
      console.log('elevator moved up')
      refresh()
    } 
  }

  const callElevator = async () => {
    console.log('calling elevator')
    const elevatorDistance = getElevatorDistance()
    for (let i = 1; i < elevatorDistance; i++){
      console.log(currentElevatorFloor)
      await moveElevatorOneFloor()
      console.log('moved one floor')
    }
  }

  const handleRideElevator = () => {
    setonElevator(!onElevator)
  }

  return (
    <div className="App">
      <h1>Elevator App</h1>
      <SetFloorComponent
        floorsSet={floorsSet}
        totalFloors={totalFloors}
        handleSaveClick={handleSaveClick}
        handleEditClick={handleEditClick}
        currentFloor={currentFloor}
        currentElevatorFloor={currentElevatorFloor}
      />
      <h2>Your desired floor is {targetFloor}.</h2>
      <div>
        <p>Which floor?</p>
        <form onSubmit={handleFloorPicker}>
          <input name='targetFloor' type='number' min={1} max={totalFloors} placeholder='Pick A Number'></input>
          <button>Lets Go!</button>
        </form>
      </div>
      
      <div>
        <h2>Use the buttons to move the elevator up and down :)</h2>
        <div>
          {
            currentElevatorFloor === totalFloors
            ? <button disabled value='up' onClick={handleUpClick}>UP</button>
            : <button onClick={() => callElevator()} value='up' onClick={handleUpClick}>UP</button>
          }
        </div>
        <div>
          {
            currentElevatorFloor === 1
            ? <button disabled value='down' onClick={handleDownClick}>DOWN</button>
            : <button onClick={() => callElevator()} value='down' onClick={handleDownClick}>DOWN</button>
          }
        </div>
        <div>
          {
            onElevator
            ? 
            <div>
              <h2>You are on the elevator.</h2>
              {
                //I can't get this condition to work for the life of me.
                currentElevatorFloor === targetFloor
                ? <button onClick={handleRideElevator}>Get off</button>
                : <button onClick={handleRideElevator}>Get off</button>
              }
              
            </div>
            : 
            <div>
              <h2>You are not on the elevator.</h2>
              {
                currentFloor === currentElevatorFloor
                ? <button onClick={handleRideElevator}>Get on</button>
                : <button disabled onClick={handleRideElevator}>Get on</button>
              }
            </div>
          }
        </div>     
     </div>       
    </div>
  );
}

export default App;
