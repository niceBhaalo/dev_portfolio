import React, {useState, useContext, useEffect} from 'react';
import {ThemeContext} from '../../contexts/ThemeContext.jsx';
import axios from 'axios';
import { IoExitOutline } from "react-icons/io5";


export default function LogInComponent ({onServerResponse, showClose, onClose}) {
	
	const theme = useContext(ThemeContext);
	const light = "#b9edd7";
	const dark = "#12291f";
	const [errorMessage, setErrorMessage] = useState("");
	const [logInUI, setLogInUI] = useState (
		{
			showLogInPage: true,
			showSignUpPage: false,
		});
	let logInParentStyle = {
		backgroundColor: theme === 'light' ? light : dark,
		color: theme === 'light' ? dark : light,
		borderColor: theme === 'light' ? dark : light,
		boxShadow: `10px 10px 20px ${theme === 'light' ? dark : light}`,
	};
	let foregroundStyle = {
		color: theme === 'light' ? dark : light,
	}
	let overlayStyle = {
		backgroundColor: theme === 'light' ? '#fcfaa4' : '#310033',
	};
	const showSignUp = () => {
		setLogInUI({
			showLogInPage: false,
			showSignUpPage: true,
		});
		setErrorMessage("");
	};
	const showLogIn = () => {
		setLogInUI({
			showLogInPage: true,
			showSignUpPage: false,
		});
		setErrorMessage("");
	};
	const [databaseID, setDatabaseID] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

    const handleLogIn = async (event) => {
		console.log("Here");
		event.preventDefault();
		const formData = {
		  databaseID,
		  password,
		};

		try {
		  const response = await axios.post('/api/db-login', formData);
		  if (response.data.authenticatedUser) {
			onServerResponse(response.data.authenticatedUser);
		  } else {
			setErrorMessage("Database Acting Up. Hold on a Minute");
		  }
		} catch (error) {
		  if (error.response) {
			if (error.response.status === 401) {
			setErrorMessage("No Match Found");
			} else if (error.response.status === 404) {
			setErrorMessage("No Match Found");
			} else {
			setErrorMessage("Unknown Error. Try Again");
			}
		  } else if (error.request) {
			// The request was made but no response was received
			setErrorMessage("Couldn't Connect to the Database");
		  } else {
			// Something happened in setting up the request that triggered an error
			setErrorMessage("Couln't Forward The Request");
		  }
		}
	};
	useEffect(() => {
	  setErrorMessage('');
	}, [password, confirmPassword, databaseID]);
	const handleSignUp = async (event) => {
	  event.preventDefault();
	  if (password !== confirmPassword) {
		  setErrorMessage("Passwords Don't Match. Try Again");
		  return;
	  }
	  const formData = {
		databaseID,
		password,
	  };

	  try {
		const response = await axios.post('/api/db-signup', formData);

		if (response.status === 201) {
		  onServerResponse(response.data.authenticatedUser);
		} else if (response.status === 400) {
		  setErrorMessage(response.data.error);
		} else {
		  console.error('Unexpected response:', response.data);
		  setErrorMessage('Unexpected error occurred');
		}
	  } catch (error) {
		console.error('There was a problem with the signup operation:', error);
		setErrorMessage('Failed to signup. Please try again later');
	  }
	};

	const onQuit = () => {
		if (showClose) {
			onClose();
		}
	};
	return (
	<>
		<div
			className="LogInParent"
			style={logInParentStyle}
		>
			{showClose && <div 
				className="crossButton"
				onClick={onQuit}
				style={foregroundStyle}
			>
				<IoExitOutline />
			</div>}
			{logInUI.showLogInPage && !logInUI.showSignUpPage && <div className={`login-container ${!errorMessage === "" ? 'glowRed' : ""}`}>
				<h2 style={foregroundStyle}>Access a Database with its Name and Password</h2>
				<form id="loginForm" onSubmit={handleLogIn}>
					<input type="text" name="databaseID" placeholder="Database Name" value={databaseID} onChange={(e) => setDatabaseID(e.target.value)} required />
					<input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
					<h4 className="errorText" style={foregroundStyle}>{errorMessage}</h4>
					<button type="submit">Access</button>
				<h4 className="linkText" style={foregroundStyle} onClick={showSignUp}>Instead Create A New Database?</h4>
				</form>
			</div>}
			{!logInUI.showLogInPage && logInUI.showSignUpPage && (
			  <div className="login-container">
				<h2 style={foregroundStyle}>Enter New Database Credentials</h2>
				<form id="signupForm" onSubmit={handleSignUp}>
				  <input type="text" name="databaseID" placeholder="Database Name" value={databaseID} onChange={(e) => setDatabaseID(e.target.value)} required />
				  <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
				  <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
					<h4 className="errorText" style={foregroundStyle}>{errorMessage}</h4>
				  <button type="submit">Create</button>
				  <h4 className="linkText" style={foregroundStyle} onClick={showLogIn}>Back To Login Page?</h4>
				</form>
			  </div>
			)}	

			</div>			
			<div 
				className="overlay"
				style={overlayStyle}
				onClick={onQuit}
			>
			</div>
		</>
	);
	
}
