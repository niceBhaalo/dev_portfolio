import React, {useState, useEffect, useContext} from 'react';

import {ThemeContext} from '../../contexts/ThemeContext.jsx';

export default function ProgressBarsApp () {
	
	const light = '#a4f5e1';
	const dark = '#132169';
	const theme = useContext(ThemeContext);
	let parentStyle = {
		position: 'absolute',
		top: 0,
		left: 0,
		minWidth: '100%',
		minHeight: '100%',
		backgroundColor: theme === 'light' ? light : dark,
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	};
	let titleStyle = {
		color: theme === 'light' ? dark : light,
		fontStyle: 'bold',
		fontSize: '2rem',
		marginTop: '40px',
		marginBottom: '20px',
	};
	let statusContainerStyle = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginBottom: '20px',

	};
	let statusHeaderStyle = {
		color: theme === 'light' ? dark : light,
		fontStyle: 'bold',
		fontSize: '1.5rem',
	};
	let labelStyle = {
		color: theme === 'light' ? dark : light,
		fontStyle: 'bold',
		fontSize: '1rem',
	};
	let inputStyle = {
		backgroundColor: 'transparent',
		border: 'none',
		borderBottom: `1px solid ${theme === 'light' ? dark : light}`,
		color: theme === 'light' ? dark : light,
		width: '50px',
		textAlign: 'center',
	};
	let progressBarParent = {
		width: 'min(95vw, 500px)',
		height: '40px',
		borderRadius: '20px',
		backgroundColor: 'grey',
		border: 'none',
		padding: 'none',
		marginTop: '2px',
		marginBottom: '15px',
		display: 'flex',
		boxShadow: `0px 0px 300px -5px ${theme === 'light' ? dark : light}`,

	};
	let progressBar = {
		position: 'relative',
		left: '0px',
		height: '100%',
		borderRadius: 'inherit',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'right',
		overflowY: 'hidden',
		minWidth: '40px',
		paddingRight: '5px',
		transition: '0.2s all ease',
		color: 'white',
		border: `2px solid ${theme === 'light' ? dark : light}`,
		boxSizing: 'border-box',
	};
	let barLabelStyle = {
		color: theme === 'light' ? dark : light,
		width: 'min(95vw, 500px)',
		paddingLeft: '20px',
		boxSizing: 'border-box',
	};
	const [inputs, setInputs] = useState(
		{
			UIInput: 0,
			UXInput: 0,
			DataInput: 0,
			RandomInput: 0,
		});

	const handleChange = (e, inputString) => {
		let value = parseInt(e.target.value); // Parse the input value to an integer
		const minValue = 0; // Minimum value
		const maxValue = 100; // Maximum value

		// Check if the value is greater than the maximum
		if (value > maxValue) {
		value = maxValue; // Set the value to the maximum
		}
		// Check if the value is less than the minimum
		else if (value < minValue) {
		value = minValue; // Set the value to the minimum
		}
  		setInputs((previousInputs) => ({
				...previousInputs, 
				[inputString]: value,
			}));
	};
	
	const generateNewRandomInput = () => {
		const randomNumber = Math.floor(Math.random() * 100);
		setInputs((previousInputs) => ({
			...previousInputs,
			RandomInput: randomNumber,
		}));
	};
  useEffect(() => {
    const intervalId = setInterval(() => {
      generateNewRandomInput();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
	return (
		<div style={parentStyle}>
			<div style={titleStyle}>
				Progress Bar
			</div>
			<div style={statusContainerStyle}>
				<div style={statusHeaderStyle}>
					Project Status:
				</div>
				<div>
					<span style={labelStyle}> UI Status: </span>
					<input 
						style={inputStyle}
						type="number"
						onChange={(e)=>handleChange(e, "UIInput")}
						min="0"
						max="100"
						value={inputs.UIInput}
					/>
				</div>
				<div>
					<span style={labelStyle}> UX Status: </span>
					<input 
						style={inputStyle}
						type="number"
						onChange={(e)=>handleChange(e, "UXInput")}
						min="0"
						max="100"
						value={inputs.UXInput}
					/>
				</div>
				<div>
					<span style={labelStyle}> Data Status: </span>
					<input 
						style={inputStyle}
						type="number"
						onChange={(e)=>handleChange(e, "DataInput")}
						min="0"
						max="100"
						value={inputs.DataInput}
					/>
				</div>
			</div>
			<div style={barLabelStyle}>
				UI Status:
			</div>
			<div style={progressBarParent}>
				<div style={{...progressBar, 'backgroundColor': 'purple', 'width': `${inputs.UIInput+(inputs.UIInput/(-20)+5)}%`}}>
					{inputs.UIInput}%
				</div>
			</div>
			<div style={barLabelStyle}>
				UX Status:
			</div>
			<div style={progressBarParent}>
				<div style={{...progressBar, 'backgroundColor': 'green', 'width': `${inputs.UXInput+(inputs.UXInput/(-20)+ 5)}%`}}>
					{inputs.UXInput}%
				</div>
			</div>
			<div style={barLabelStyle}>
				Data Status:
			</div>
			<div style={progressBarParent}>
				<div style={{...progressBar, 'backgroundColor': '#e33698', 'width': `${inputs.DataInput+(inputs.DataInput/(-20)+ 5)}%`}}>
					{inputs.DataInput}%
				</div>
			</div>
			<div style={barLabelStyle}>
				Total Status:
			</div>
			<div style={progressBarParent}>
				<div style={{...progressBar, 'backgroundColor': '#391369', 'width': `${(inputs.DataInput + inputs.UIInput + inputs.UXInput)/3 + ((inputs.DataInput + inputs.UIInput + inputs.UXInput) / -60) + 5}%`}}>
					{Math.floor((inputs.DataInput + inputs.UIInput + inputs.UXInput) / 3)}%
				</div>
			</div>
			<div style={barLabelStyle}>
				Random Status:
			</div>
			<div style={progressBarParent}>
				<div style={{...progressBar, 'backgroundColor': 'blue', 'width': `${inputs.RandomInput}%`}}>
					{inputs.RandomInput}%
				</div>
			</div>
		</div>
	);
	
}
