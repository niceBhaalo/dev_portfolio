import React, { useState, useEffect, useContext } from 'react';
import './TemperatureShowcaseCss.css';
import TempButton from './TemperatureButton.jsx';
import axios from 'axios';
import {ThemeContext} from '../../contexts/ThemeContext.jsx';

export default function TemperatureShowcaseApp () {
		const theme = useContext(ThemeContext);

	const [temperature, setTemperature] = useState(22);

	const [tempData, setTempData] = useState([]);
	
	const [exactLoc, setExactLoc] = useState(null);
	const [lesserLoc, setLesserLoc] = useState(null);
	const [higherLoc, setHigherLoc] = useState(null);
	
	const [dataFetched, setDataFetched] = useState(false);
	
	const [unitType, setUnitType] = useState('C');
	useEffect (()=>{
		async function getData() {	
			try {
				const response = await axios.get('/weather/get-city-data');
					if (response.data.length !== 0) {
						response.data.map((data)=>{
							let toAdd = {
								name: data.temperature.location.name,
								temp_c: data.temperature.current.temp_c,
								temp_f: data.temperature.current.temp_f
							}
							setTempData(prevTempData => [...prevTempData, toAdd]); // Using spread operator correctly
							setDataFetched(true);
							setTemperature(temp=>temp);
							return 0;
						}
						);
					}
			} catch (error) {
				console.log(error);
			}
		}
		getData();
	}, []);
	
	useEffect( ()=> {
		if (dataFetched) {
			const sortedData = tempData.slice().sort((a, b) => a.temp_c - b.temp_c);
			let currentTemperature = 0.0;
			if (unitType === 'C') {
				currentTemperature = parseFloat(temperature.toFixed(1));
			} else {
				currentTemperature = parseFloat(((temperature-32) * 5 / 9).toFixed(1));
			}
			let exactMatch = null;
			let nextGreater = null;
			let prevLesser = null;

			for (let i = 0; i < sortedData.length; i++) {
				if (sortedData[i].temp_c === currentTemperature) {
					exactMatch = sortedData[i];
					break;
				} else if (sortedData[i].temp_c < currentTemperature) {
					prevLesser = sortedData[i];
				} else {
					nextGreater = sortedData[i];
					break;
				}
			}
			setExactLoc(exactMatch);
			setLesserLoc(prevLesser);
			setHigherLoc(nextGreater);
		}
		},[temperature, tempData, unitType, dataFetched]);
	
	const handleToggle = () => {
		setUnitType(prev => {
			if (prev === 'C')
			{
				setTemperature(temp=>parseFloat(((temp*9)/5 + 32).toFixed(1)));
				return 'F';
			} else {
				setTemperature(temp=>parseFloat(((temp-32) * 5 / 9).toFixed(1)));
				return 'C';
			}
		})
	};
	
	return (
	<div className={`TemperatureShowcaseParentDiv ${theme}`}>
		<div className={`TemperatureCard ${theme}`}>
			<button className={`TemperatureToggleButton ${theme}`} onClick={handleToggle}>&deg;{unitType === 'C' ? 'F' : 'C'}</button>
			
			<div className="TemperatureDisplay">
				<div className="TemperatureText">{temperature} &deg;{unitType}</div>
			</div>
			
			<div className="TemperatureButtons">
				<TempButton text={"-"} setTemperature={setTemperature} action={"decrease"} classes={`TemperatureButton ${theme}`}/>
				<TempButton text={"+"} setTemperature={setTemperature} action={"increase"} classes={`TemperatureButton ${theme}`}/>
			</div>
			
			<div className={`TemperatureComparisonDiv ${theme}`}>
			{dataFetched && (
				<>
				{exactLoc && (
					<>
						<span className="TemperatureComparisonText">Current Temperature of</span>
						<span className="TemperatureLocationName">{exactLoc.name}</span>
					</>
				)}
				{!exactLoc && (
					<>
						<span className="TemperatureComparisonText">Between the Temperature of</span>
						<span className="TemperatureLocationName">{lesserLoc ? lesserLoc.name : 'Planet Hoff'}</span>
						<span className="TemperatureComparisonText">and</span>
						<span className="TemperatureLocationName">{higherLoc ? higherLoc.name : 'Planet Arrakis'}</span>
					</>
				)}
				</>
			)}
			{!dataFetched && (
				<span>Fetching Weather Data...</span>
			)}
			</div>
		</div>	
	</div>
	);
}
