import Title from "../Components/Title.jsx";
import React from 'react';
import './RandomizeColorsApp.css';
import ColorColumn from "./ColorColumn.jsx";

export default function RandomizeColorsApp() {

    return (
        <div className="RCAContainer">
			<div className="RCATitleContainer">
				<Title classes={"RCATitle"} text={"Create Color Mixtures"} />
				<Title classes={"RCASubtitle"} text={"Click on HexCodes to get new Colors"} />
			</div>
			<ColorColumn />
			<ColorColumn />
			<ColorColumn />
        </div>
    );
}
