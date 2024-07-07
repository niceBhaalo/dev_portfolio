import React, {useContext, useState, useRef, useEffect} from 'react';
import {ThemeContext} from '../../contexts/ThemeContext.jsx';
import { IoExitOutline } from "react-icons/io5";

import useStateMachine from './useStateMachine';
import { states } from './StateMachine';

export default function SubscribeDialogBox({showDialogBox, onClick, settingSubbed, showUnSub}) {
	
	const [state, transition] = useStateMachine(states.INITIAL);

	const theme = useContext(ThemeContext);
	const light = '#cdfa96';
	const dark = '#1b290a';
	// const [showInput, setShowInput] = useState(false);
	const [email, setEmail] = useState("");
	const [invalidEmail, setInvalidEmail] = useState('empty');
	const [showInvalid, setShowInvalid] = useState(false);
	const [subbed, setSubbed] = useState(false);
	const [showReSub, setShowReSub] = useState(true);

	const inputBox = useRef(null);
	let dialogBoxStyle = {
		backgroundColor: theme === 'light' ? light : dark,
		borderColor: theme === 'light' ? dark : light,
		color: theme === 'light' ? dark : light,
		boxShadow: `3px 3px ${theme === 'light' ? dark : light}, 6px 6px ${theme === 'light' ? light : dark}, 9px 9px ${theme === 'light' ? dark : light}`,

	};
	let buttonStyleNo = {
		backgroundColor: theme === 'light' ? 'white' : 'black',
		borderColor: theme === 'light' ? dark : light,
		color: theme === 'light' ? 'black' : 'white',
		left: '5px',

	};
	let buttonStyleYes = {
		backgroundColor: 'red',
		borderColor: theme === 'light' ? dark : light,
		color: theme === 'light' ? 'black' : 'white',
		right: '5px',
	};
	let buttonSubmitStyle = {
		backgroundColor: 'red',
		borderColor: theme === 'light' ? dark : light,
		color: theme === 'light' ? 'black' : 'white',
		left: '50%',
		transform: 'translateX(-50%)',
	};
	let inputStyle = {
		outline: `2px solid ${invalidEmail === 'none' ? 'black' : invalidEmail === 'correct' ? 'green' : 'red'}`,
		boxShadow: `0px 0px 40px -5px ${invalidEmail === 'none' ? 'black' : invalidEmail === 'correct' ? 'green' : 'red'}`,
		borderRadius: '10px',
	};
	let errorStyle = {
		color: 'red',
		position: 'relative',
	};
	let successStyle = {
		color: theme === 'light' ? dark : light,
		position: 'relative',
		textAlign: 'center',
	};
	let unSubStyle = {
		color: 'red',
		position: 'relative',
		textAlign: 'center',
		cursor: 'default',
	};
	let linkStyle = {
		cursor: 'pointer',
		fontStyle: 'italic',
		textDecoration: 'underline',
	};
	let overlayStyle = {
		backgroundColor: theme === 'light' ? '#fcfaa4' : '#310033',
	};
	const handleYes = () => {
		console.log(state);
		transition('subscribe');
	};
	const handleInput = (e) => {
		setShowInvalid(false);
		const value = e.target.value.trim();
		setEmail(value);
		if (value.length === 0) {
			setInvalidEmail("none");
		} else {
			const isValid = inputBox.current.checkValidity();
			if (isValid) {
				setInvalidEmail("correct");
			} else {
				setInvalidEmail("incorrect");
			}			
		}
	};
	const handleSubmit = () => {
		if (invalidEmail === 'correct') {
			transition('submit');
			setSubbed(true);
			settingSubbed(true);
			setShowReSub(false);
		} else {
			setShowInvalid(true);
			setTimeout(() => setShowInvalid(false), 3000);
		}
		console.log(email);
		console.log(showReSub);
	};
	const handleUnSubbed = () => {
		settingSubbed(false);
		setSubbed(false);
		transition('confirmUnsub');
	};
	const handleSubAgain = () => {
		transition('resubscribe');
	};
	const onClose = () => {
		onClick();
		console.log("HERE");
	};
	useEffect(()=>{
		console.log(state);
		if (showDialogBox) {
			if (subbed) {
				transition('subbed');
			} else {
				transition('unsubbed');
			}
		} else {
			transition('exit');
		}
	}, [showDialogBox, subbed, transition, state]);
	
	const [bounce, setBounce] = useState("");
	useEffect(()=>{
		setTimeout(()=>{
			setBounce("");
		}, 500);
		return () => setBounce("bounce");
	}, [state]);
	
  	return (
  	<>
		{showDialogBox===true && (<div className="dialogBoxContainer">
			<div 
			className={`dialogBox ${bounce}`}
			style={dialogBoxStyle}
		>
			<div 
				className="subscribeCrossButton"
				onClick={onClose}
			>
				<IoExitOutline />
			</div>
			{state === states.INITIAL && (<>
				<div className="title">
				Don't Miss Out
				</div>
				<div className="subtitle">
				Subscribe Now for Notifications about Quality Articles
				</div> 
				<div className="buttonContainer">
				<button 
					className="dialogButton"
					style={buttonStyleNo}
					onClick={onClose}
				>
				Not Now
				</button>
				<button 
					className="dialogButton"
					style={buttonStyleYes}
					onClick={handleYes}
				>
				Subscribe
				</button>
				</div>
			</>)}
			{state === states.SHOW_INPUT && (<>
				<div className="title">
					Enter Your Email Address
				</div>
				<input 
					className="emailInput"
					style={inputStyle}
					type="email"
					onChange={handleInput}
					placeholder="Email Address"
					ref={inputBox}
				 />
				<button 
					className="dialogButton"
					style={buttonSubmitStyle}
					onClick={handleSubmit}
				>
				Submit
				</button>
				{showInvalid && <div 
					style={errorStyle}
				>
					Invalid Email
				</div>}				 
			</>)}
			{state === states.SUBSCRIBED && <div
					style={successStyle}
				>
					You have subscribed successfully.
				</div>
			}
			{state === states.SHOW_UNSUB && (<div
				style={unSubStyle}
				>
				Are You Sure You Want To&nbsp;
				<span style={linkStyle} onClick={handleUnSubbed}>Unsubscribe</span>?
				</div>)
			}
			{state === states.UNSUBSCRIBED && (<div
				style={unSubStyle}
				>
				You Have Successfully Unsubscribed. You can subscribe again&nbsp;
				<span style={linkStyle} onClick={handleSubAgain}>here</span>.
				</div>)
			}
		</div>

		</div>)}
		{state !== states.BAKA && <div 
			className="overlay"
			style={overlayStyle}
			onClick={onClose}
		>
		</div>}
		</>
	);	
	}
