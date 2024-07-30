import ChevronLeft from "../Components/ChevronLeft.jsx";
import ChevronRight from "../Components/ChevronRight.jsx";
import CopyToClipboardButton from "../Components/CopyToClipboardButton.jsx";
import React, { useState } from 'react';

export default function ColorColumn() {

    const [color, setColor] = useState(getRandomColor());
	const [history, setHistory] = useState([color]);
	const [location, setLocation] = useState([0,0]);

	function getRandomColor () {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i=0; i<6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	    function handleClick(colorSetter, historySetter, history, location, locationSetter) {
        const newColor = getRandomColor();
        colorSetter(newColor);
		historySetter(history => history.concat(newColor));
		locationSetter([location[1]+1, location[1]+1]);
		console.log(location);
	}
    function handlePrevious(colorSetter, history, location, locationSetter) {
		if (location[0] !== 0) {
			const previousColor = history[location[0]-1];
			colorSetter(previousColor);
			locationSetter([location[0]-1, location[1]]);
			console.log(location);
		}
    }
	function handleNext(colorSetter, history, location, locationSetter) {
		if (location[0] !== location[1]) {
			const nextColor = history[location[0]+1];
			locationSetter([location[0]+1, location[1]]);
			colorSetter(nextColor);
			console.log(location);
		}
	}
	return (
		<div className="RCAColorColumn" style={{backgroundColor: color}}>
			<button className="RCAHexButton" onClick={() => handleClick(setColor, setHistory, history, location, setLocation)}>{color}</button>
			<CopyToClipboardButton classes={"RCAHexButton"} toCopy={color} />
			<div style={{ textAlign: 'center' }}>
				<ChevronLeft onClick={() => handlePrevious(setColor, history, location, setLocation)} />
				<ChevronRight onClick={() => handleNext(setColor, history, location, setLocation)} />
			</div>
		</div>
	);

}

