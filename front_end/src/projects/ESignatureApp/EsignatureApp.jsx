import React, {useState, useContext} from 'react';
import Title from "../Components/Title.jsx";
import SubmissionCard from "../Components/SubmissionCard.jsx";
import TotalRequestsCard from "../Components/TotalRequestsCard.jsx";
import FirstRequestCard from "../Components/FirstRequestCard.jsx";
import LastRequestCard from "../Components/LastRequestCard.jsx";
import CheckDateCard from "../Components/CheckDateCard.jsx";
import CheckNameCard from "../Components/CheckNameCard.jsx";
import {ThemeContext, themes } from '../../contexts/ThemeContext.jsx';

import './EsignatureAppCSS.css';
export default function EsignatureApp() {

	const theme = useContext(ThemeContext);
	document.body.style.background = "#eee";
	
	return (
		<div className={`ParentDiv ${theme}`}>
			<Title classes={`EsigTitle ${theme}`} text={"Database Implementation"} />

			<SubmissionCard />
			<TotalRequestsCard />
			<FirstRequestCard />
			<LastRequestCard />
			<CheckNameCard />
			<CheckDateCard />
			
		</div>
	)
}
