import React, { useState, useContext } from 'react';
import axios from 'axios';
import DisplayData from './DisplayData.jsx';
import {ThemeContext} from '../../contexts/ThemeContext.jsx';

export default function CheckNameCard () {
		const theme = useContext(ThemeContext);

	const [name, setName ] = useState("");
	const [buttonDisabled, setButtonDisabled ] = useState(true);
	
	const [ recievedData, setRecievedData ] = useState([]);
	const handleNameChange = (e) => {
		setName(e.target.value);
		if (e.target.value === ""){
			setButtonDisabled(true);
		} else {
			setButtonDisabled(false);
		}
	};
	const [dataStatus, setDataStatus ] = useState();
	const [fadeStatus, setFadeStatus ] = useState(false);
	async function getData() {
		setRecievedData([]);
		setDataStatus('Checking...');
		setFadeStatus(false);
		try {
			const response = await axios.post('/api/get-names', { name });
			if (response.data.length !== 0) {
				setRecievedData(response.data);
				setDataStatus('(Updated)');
				setButtonDisabled(true);
				setTimeout(() => {
					setButtonDisabled(false);
				}, 3000);
				setTimeout(() => {
					setFadeStatus(true);
				}, 3000);
			} else {
				setDataStatus("No Data Found");
			}
		} catch (error) {
			setDataStatus("No Data Received");
		}
	}

	return (
	    <div className={`EsigCard ${theme}`}>
			<div className={"container justify-content align-items"}>
				<div style={{marginTop: '5px'}}>
					<span className={"bold"}>Find This Name: </span>{(' ')}
					<input type="text" placeholder={"Name"} value={name} className={"text-box'1"} onChange={handleNameChange}/>
					{(' ')}<span className={fadeStatus ? "italic fade-out" : "italic"}>{dataStatus}</span>
				</div>
				<button className={"btn-1"} onClick={getData} disabled={buttonDisabled}>Get</button>
			</div>
			<DisplayData data={recievedData}/>
		</div>
	);
}
