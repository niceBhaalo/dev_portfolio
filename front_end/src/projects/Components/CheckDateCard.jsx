import React, { useState, useContext } from 'react';
import axios from 'axios';
import DisplayData from './DisplayData.jsx';
import {ThemeContext} from '../../contexts/ThemeContext.jsx';


export default function CheckDataCard () {

	const theme = useContext(ThemeContext);

	const [day, setDay ] = useState("");
	const [month, setMonth ] = useState("");
	const [year, setYear ] = useState("");

	const [buttonDisabled, setButtonDisabled ] = useState(false);
	
	const [ recievedData, setRecievedData ] = useState([]);
	const handleDayChange = (e) => {
		setDay(e.target.value);
	};
	const handleMonthChange = (e) => {
		setMonth(e.target.value);
	};
	const handleYearChange = (e) => {
		setYear(e.target.value);
	};
	const [dataStatus, setDataStatus ] = useState();
	const [fadeStatus, setFadeStatus ] = useState(false);
	
	async function getData() {
		setRecievedData([]);
		setDataStatus('Checking...');
		setFadeStatus(false);
		setTimeout(() => {
			setButtonDisabled(false);
		}, 3000);
		try {
			const response = await axios.post('/api/get-dates', { day, month, year });
			if (response.data.length !== 0) {
				setRecievedData(response.data);
				setDataStatus('(Updated)');
				setButtonDisabled(true);

				setTimeout(() => {
					setFadeStatus(true);
				}, 3000);
			} else {
				setDataStatus("No Data Found");
			}
		} catch (error) {
			setDataStatus("Connection to Server Down");
		}
	}

	return (
	    <div className={`EsigCard ${theme}`}>
			<div className={"container justify-content align-items"}>
				<div style={{marginTop: '5px'}}>
					<span className={"bold"}>Find Birthday Twins: </span>{(' ')}
					<br />
					<span className={"bold"}>Day: </span>{(' ')}
					<input type="text" value={day} className={"text-box-1"} style={{width: '20px'}} onChange={handleDayChange}/>
					<span className={"bold"}>Month: </span>{(' ')}
					<input type="text" value={month} className={"text-box-1"} style={{width: '20px'}} onChange={handleMonthChange}/>
					<span className={"bold"}>Year: </span>{(' ')}
					<input type="text" value={year} className={"text-box-1"} style={{width: '30px'}} onChange={handleYearChange}/>

					{(' ')}<span className={fadeStatus ? "italic fade-out" : "italic"}>{dataStatus}</span>
				</div>
				<button className={"btn-1"} onClick={getData} disabled={buttonDisabled}>Get</button>
			</div>
			<DisplayData data={recievedData}/>
		</div>
	);
}
