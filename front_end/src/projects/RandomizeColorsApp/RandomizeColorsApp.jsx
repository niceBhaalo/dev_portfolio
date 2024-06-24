import Title from "../Components/Title.jsx";
import CopyToClipboardButton from "../Components/CopyToClipboardButton.jsx";
import React, { useState } from 'react';
import ChevronLeft from "../Components/ChevronLeft.jsx";
import ChevronRight from "../Components/ChevronRight.jsx";

export default function RandomizeColorsApp() {

    const [color1, setColor1] = useState(getRandomColor());
    const [color2, setColor2] = useState(getRandomColor());
    const [color3, setColor3] = useState(getRandomColor());
    
	const [colorHistory1, setColorHistory1] = useState([color1]);
	const [colorHistory2, setColorHistory2] = useState([color2]);
	const [colorHistory3, setColorHistory3] = useState([color3]);

	const [locColor1, setLocColor1] = useState([0,0]);
	const [locColor2, setLocColor2] = useState([0,0]);
	const [locColor3, setLocColor3] = useState([0,0]);

    const containerStyle = {
        position: 'absolute',
        height: "100%",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: -1,
    };
	const columnStyle = {
		flex: 1,
		height: '100%',
		display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
	};
	const titleStyle = {
		border: '2px solid #CA9AE7',
		borderRadius: '10px',
		backgroundColor: '#5F99E9',
		width: '60%',
	}
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
        <div className="container justify-center text-center">
			<div className="container flex-col align-c text-center" style={titleStyle}>
				<Title classes={"fs-1"} text={"Create Color Mixtures"} />
				<Title classes={"fs-3"} text={"Click on HexCodes to get new Colors"} />
			</div>
            <div className="h-container" style={containerStyle}>
				<div style={{...columnStyle, backgroundColor: color1}}>
                    <button className="btn-2 mg-20" onClick={() => handleClick(setColor1, setColorHistory1, colorHistory1, locColor1, setLocColor1)}>{color1}</button>
                    <CopyToClipboardButton classes={"btn-2"} toCopy={color1} />
					<div style={{ textAlign: 'center' }}>
						<ChevronLeft onClick={() => handlePrevious(setColor1, colorHistory1, locColor1, setLocColor1)} />
						<ChevronRight onClick={() => handleNext(setColor1, colorHistory1, locColor1, setLocColor1)} />
					</div>
                </div>
				<div style={{...columnStyle, backgroundColor: color2}}>
                    <button className="btn-2 mg-20" onClick={() => handleClick(setColor2, setColorHistory2, colorHistory2, locColor2, setLocColor2)}>{color2}</button>
                    <CopyToClipboardButton classes={"btn-2"} toCopy={color2} />
					<div style={{ textAlign: 'center' }}>
						<ChevronLeft onClick={() => handlePrevious(setColor2, colorHistory2, locColor2, setLocColor2)} />
						<ChevronRight onClick={() => handleNext(setColor2, colorHistory2, locColor2, setLocColor2)} />
					</div>
                </div>
				<div style={{...columnStyle, backgroundColor: color3}}>
                    <button className="btn-2 mg-20" onClick={() => handleClick(setColor3, setColorHistory3, colorHistory3, locColor3, setLocColor3)}>{color3}</button>
                    <CopyToClipboardButton classes={"btn-2"} toCopy={color3} />
					<div style={{ textAlign: 'center' }}>
						<ChevronLeft onClick={() => handlePrevious(setColor3, colorHistory3, locColor3, setLocColor3)} />
						<ChevronRight onClick={() => handleNext(setColor3, colorHistory3, locColor3, setLocColor3)} />
					</div>
                </div>
            </div>
        </div>
    );
}
