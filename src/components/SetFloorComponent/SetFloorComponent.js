import React from 'react';

export const SetFloorComponent = ({ floorsSet, totalFloors, handleSaveClick, handleEditClick, currentFloor, currentElevatorFloor }) => {
  return (
    <div>
      {
        floorsSet
        ? 
        <div>
          <h2>Your building has {totalFloors} floors. <button onClick={handleEditClick}>Edit</button></h2>
          <h2>You are currently on floor {currentFloor}.</h2>
          <h2>The elevator is currently on {currentElevatorFloor}</h2>
        </div>
        : 
        <div>
          <h2>How many floors does your building have?</h2>
          <form onSubmit={ (evt) => handleSaveClick(evt)}>
            <input name='numFloors' type='number' placeholder='Pick A Number' min={2}></input>
            <button type='submit'>Save</button>
          </form>
        </div>
      }
    </div>
  );
};