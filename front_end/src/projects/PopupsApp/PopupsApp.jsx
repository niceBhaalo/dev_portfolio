import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import './PopupsApp.css';

export default function PopupsApp () {

	function createNewPopUp() {
		const gap = 50 / viewportWidth * 100;
		const xValue = Math.floor(Math.random() * (100-gap-gap/2-gap/2) + gap/2);
		const yValue = Math.floor(Math.random() * (85-gap) + gap);
		setPopUps((prevPopUps) => [
			...prevPopUps,
			{ 'text': currentInt + 1, 'xValue': xValue, 'yValue': yValue }
		]);
		setCurrentInt((prevInt) => prevInt + 1);
	}
	const theme = useContext(ThemeContext);
	const [createPops, setCreatePops] = useState(true);
	const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
	const light = "#FFFACD";
	const dark = "#483D8B";
	let containerStyle = {
		userSelect: 'none',
		position: 'absolute',
		minWidth: '100%',
		minHeight: '100%',
		left: 0,
		top: 0,
		backgroundColor: theme === 'light' ? light : dark,
	};
	let instructionText = {
		position: 'relative',
		top: 0,
		left: 0,
		margin: '20px',
		color: theme === 'light' ? dark : light,
		wrap: 'wrap',
		width: 200,
		fontSize: '1.5rem',
	}
	let popUpStyle = {
		position: 'fixed',
		width: '50px',
		height: '50px',
		borderRadius: '25px',
		border: `2px solid ${theme === "light" ? light : dark}`, // Use template literals correctly
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: '25px',
		boxSizing: 'border-box',
		backgroundColor: theme === 'light' ? dark : light,
		color: theme === 'light' ? light : dark,
	};
	let victoryStyle = {
		position: 'fixed',
		width: `min(500px, 95vw)`,
		height: `min(300px, 50vw)`,
		backgroundColor: theme === 'light' ? dark : light,
		color: theme === 'light' ? light : dark,
		borderRadius: '10px',
		border: `2px solid ${theme === "light" ? light : dark}`, // Use template literals correctly
		top: '50vh',
		left: '50vw',
		transform: `translate(-50%, -50%)`,
	}
	const [popUps, setPopUps] = useState([]);
	const [currentInt, setCurrentInt] = useState(0);
	const [initialPopUpsGenerated, setInitialPopUpsGenerated] = useState(false);

	const handlePop = (index) => {
		if (popUps[index.index].text === currentInt) {
			setPopUps((prevPopUps) => {
				const updatedPopUps = prevPopUps.filter((_, i) => i !== index.index);
				return updatedPopUps;
			});	
				if (currentInt === 1) {
					setCreatePops(false);
				}
				setCurrentInt((prevInt) => prevInt - 1);
				
		} else {
			createNewPopUp();
		}
	};
  
	const generateInitialPopUps = () => {
		let startingPoint = 5;
		const initialPopUps = [];
		const gap = 50 / viewportWidth * 100;
			
		for (let i = 1; i <= startingPoint; i++) {
			const xValue = Math.floor(Math.random() * (100-gap-gap/2-gap/2) + gap/2);
			const yValue = Math.floor(Math.random() * (85-gap) + gap);
			initialPopUps.push({ 'text': i, 'xValue': xValue, 'yValue': yValue });
		}
		setPopUps(initialPopUps);
		setCurrentInt(startingPoint);
		setInitialPopUpsGenerated(true); 
	};
	
	useEffect(() => {
		if (!initialPopUpsGenerated) {
		  generateInitialPopUps(); // Call the function to generate initial pop-ups
		}		
		if (createPops && currentInt < 99) {
			const intervalId = setInterval(() => {
				createNewPopUp();
			}, 1500);

			// Cleanup function to clear the interval when component unmounts
			return () => clearInterval(intervalId);
		}
	}, [createPops, currentInt, initialPopUpsGenerated]);
	
	const handleRestart = () => {
		setInitialPopUpsGenerated(false);
		console.log("Restart Called");
		setCreatePops(true);
	};
return (
	<div style={containerStyle}>
		<div style={instructionText}>
			Pop The Pop-Up with the largest number
		</div>
		{popUps && (popUps.map((item,index) => (
			<div 
				style={{...popUpStyle, 'left': `${item.xValue}vw`, 'top': `${item.yValue}vh`}}
				onClick={()=>handlePop({index})}
				key={index}
			>
				{item.text}
			</div>
			)))}
		{createPops === false && (
			<div className="popUpsVictory" style={victoryStyle}>
				<div>Congratulations!!!</div>
				<button
					className="popUpsRestartButton"
					onClick={handleRestart}>
					Click to Restart
				</button>
			</div>
			)}
	</div>
);

}
