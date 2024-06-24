import React, { useState, useContext } from 'react';
import axios from 'axios';
import {ThemeContext} from '../../contexts/ThemeContext.jsx';


export default function FirstRequestCard () {
	
		const theme = useContext(ThemeContext);


	const [name, setName ] = useState();
	const [date, setDate ] = useState();
	const [buttonDisabled, setButtonDisabled ] = useState(false);

	const [dataStatus, setDataStatus ] = useState();
	const [fadeStatus, setFadeStatus ] = useState(false);
	async function getData () {
		setDataStatus('Checking...');
		setFadeStatus(false);
		const response = await axios.post('/api/get-first-entry');
		console.log(response);
		if (response.data.date) {
			setName(response.data.name);
			setDate(response.data.date);
			setDataStatus('(Updated)')
			setButtonDisabled(true);
			setTimeout(()=> {
				setButtonDisabled(false);
			}, 3000);
			setTimeout(() => {
				setFadeStatus(true);
			}, 3000);
		} else {
	//		setTotalEntries('Error Fetching Data');
			setDataStatus('');
		}
	}

	return (
	    <div className={`EsigCard ${theme}`}>
			<div className={"container justify-content align-c"}>
				<div className={"container flex-col"}>
					<div style={{marginTop: '5px'}}>
						<span>Check First Ever Entry:</span>{(' ')}
						<span className={fadeStatus ? "italic fade-out" : "italic"}>{dataStatus}</span>
					</div>
					{dataStatus && (<div>
						<div style={{marginTop: '5px'}}>
							<span className={"bold"}>Name:</span>{(' ')}
							<span className={"underline"}>{name}</span>{(' ')}
						</div>
						<div style={{marginTop: '5px'}}>
							<span className={"bold"}>DoB:</span>{(' ')}
							<span className={"underline"}>{date}</span>{(' ')}
						</div>
					</div>)}
				</div>
				<button className={"btn-1"} onClick={getData} disabled={buttonDisabled}>Get</button>
			</div>
		</div>
	);
}
