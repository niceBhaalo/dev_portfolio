import React, { useState, useContext } from 'react';
import axios from 'axios';
import {ThemeContext, themes } from '../../contexts/ThemeContext.jsx';

export default function TotalRequestsCard () {

	const theme = useContext(ThemeContext);

	const [totalEntries, setTotalEntries ] = useState();
	const [buttonDisabled, setButtonDisabled ] = useState(false);
	const [dataStatus, setDataStatus ] = useState();
	const [fadeStatus, setFadeStatus ] = useState(false);
	async function getData () {
		setDataStatus('Checking...');
		setFadeStatus(false);
		const response = await axios.post('/api/get-total-number');
		if (response.data.total) {
			setTotalEntries(response.data.total);
			setButtonDisabled(true);
			setDataStatus('(Updated)')
			setTimeout(()=> {
				setButtonDisabled(false);
			}, 3000);
			setTimeout(() => {
				setFadeStatus(true);
			}, 3000);
		} else {
			setTotalEntries('Error Fetching Data');
			setDataStatus('');
		}
	}

	return (
	    <div className={`EsigCard ${theme}`}>
			<div className={"container justify-content align-c"}>
				<div>
					<span className={"bold"}>Total No. of Database Entries:</span>{(' ')}
					{totalEntries && (<span>
						<span className={"bold"}>{totalEntries}</span>{(' ')}
						<span className={fadeStatus ? "italic fade-out" : "italic"}>{dataStatus}</span>
						</span>
					)}
				</div>
				<button className={"btn-1"} onClick={getData} disabled={buttonDisabled}>Get</button>
			</div>
		</div>
	);
}
