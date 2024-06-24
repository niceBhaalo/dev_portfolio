import React, { useState, useEffect, useRef } from 'react';

export default function TempButton({ text, setTemperature, classes, action }) {
  const [startTime, setStartTime] = useState(null); // Track the start time of the hold action
  const incrementId = useRef(null);
  const decayInterval = useRef(null);

  const increasedTemperature = () => {
    if (action === 'decrease') {
      setTemperature(temp => parseFloat((temp - 0.1).toFixed(1)));
    } else {
      setTemperature(temp => parseFloat((temp + 0.1).toFixed(1)));
    }
  };

  const handleMouseDown = () => {
    increasedTemperature();
    setStartTime(Date.now()); // Record the start time of the hold action

    incrementId.current = setInterval(() => {
      increasedTemperature();
    }, 100);
  };

  const handleMouseUp = () => {
    clearInterval(incrementId.current);
    clearInterval(decayInterval.current); // Clear decay interval if it exists
  };

  const handleMouseLeave = () => {
    clearInterval(incrementId.current);
    clearInterval(decayInterval.current); // Clear decay interval if it exists
  };

  useEffect(() => {
  
	function increaseTemperature() {
		if (action === 'decrease') {
		  setTemperature(temp => parseFloat((temp - 0.1).toFixed(1)));
		} else {
		  setTemperature(temp => parseFloat((temp + 0.1).toFixed(1)));
		}
	}
    if (startTime) {
      decayInterval.current = setInterval(() => {
        // Calculate the elapsed time since the hold action started
        const elapsedTime = Date.now() - startTime;
        // Decrease the interval duration over time (adjust the decay rate as needed)
        const newIntervalDuration = Math.max(50, 100 - elapsedTime / 10);
        clearInterval(incrementId.current); // Clear the previous interval
        incrementId.current = setInterval(() => {
          increaseTemperature();
        }, newIntervalDuration);
      }, 1000); // Check decay every 100 milliseconds
    }

    return () => clearInterval(decayInterval.current); // Cleanup function
  }, [startTime, action, setTemperature]);

  return (
    <button
      className={classes ? classes : ''}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {text ? text : 'P'}
    </button>
  );
}
