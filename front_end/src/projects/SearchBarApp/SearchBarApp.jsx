import React, { useState, useEffect, useRef, useContext } from 'react';
import { IoSearch } from "react-icons/io5";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";

export default function SearchBarApp() {
	const theme = useContext(ThemeContext);
	
	const [inputValue, setInputValue] = useState("");
	const [textChunks, setTextChunks] = useState([]);
	const [uiProps, setUiProps] = useState({
		bg: theme === 'light' ? 'yellow' : 'purple',
		shadow: "",
		showSearchBar: false,
		showSearchIcon: true,
		transitions: "all .3s ease",
		textColor: theme === 'light' ? 'black' : 'white',
	});
	const inputElement = useRef(null);
	const parentElement = useRef(null);
	let searchIconStyle = {
		position: "fixed",
		top: "1vw",
		right: "1vw",
		color: theme === 'light' ? 'black' : 'white',
		fontSize: 50,
		cursor: "pointer",
	};
	let containerStyle = {
		position: "absolute",
		minHeight: "100%",
		minWidth: "100%",
		left: "0",
		top: "0",
		backgroundColor: uiProps.bg,
		boxShadow: uiProps.shadow,
	};
	let inputStyle = {
		color: theme === 'light' ? 'black' : 'white',
		width: "min(60%, 700px)",
		height: "30px",
		position: "relative",
		left: "50%",
		top: "30vh",
		padding: "1rem 3rem",
		outline: "none",
		transform: "translateX(-50%)",
		backgroundColor: theme === 'light' ? 'rgba(255, 255, 0, 0.5)' : 'rgba(128, 0, 128, 0.5)',
		border: "none",
		borderBottom: "1px solid black",
		fontSize: "1.3rem",
		boxShadow: "0px 55px 60px -15px rgba(0,0,0,.75)",
		transition: "all .3s ease",
		zIndex: 10,
		borderRadius: "min(250px, 45vw)",
	};
	
	const showSearch = (key) => {
		setUiProps(prevProps => ({
			...prevProps,
			showSearchBar: true,
			showSearchIcon: false,
		}));
		console.log(key);
		if (key) {
			setInputValue(key);
		} else {
			setInputValue("");
		}
	};
	const handleBlur = () => {
		setUiProps(prevProps => ({
			...prevProps,
			showSearchBar: false,
			showSearchIcon: true,
			shadow: "none",
		}));
	};
	const handleFocus = () => {
		setUiProps(prevProps => ({
			...prevProps,
			shadow: "inset 0 -20vh 30vw 200px rgba(0,0,0,0.8)",
		}));
	};
	useEffect(() => {
		if (uiProps.showSearchBar) {
			inputElement.current.focus();
		} else {
			parentElement.current.focus();
		}
		setUiProps(prevProps => ({
			...prevProps,
			bg: theme === 'light' ? 'yellow' : 'purple',
		}));
	}, [uiProps.showSearchBar, theme]);
	
	const handleTilde = (event) => {
		if (uiProps.showSearchIcon && /^[a-zA-Z0-9]$/i.test(event.key)) {
			event.preventDefault(); // Prevent the default behavior of the key press event

			showSearch(event.key);
		}
	};
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};
	const handleKeyDown = (event) => {
		if (event.key ==='Enter') {
			processInputValue(inputValue);
			parentElement.current.focus();
		} else if (event.key === 'Escape') {
			handleBlur();
		}
	};
	let textChunkStyle = {
		width: "100px",
		wrap: "wrap",
		color: theme === 'light' ? 'black' : 'white',
		zIndex: 0,
	}
	const processInputValue = (value) => {
		const xValue = Math.floor(Math.random() * (90 - 10 + 1)) + 10;
		const yValue = Math.floor(Math.random() * (90 - 10 + 1)) + 10;
		setTextChunks([...textChunks, {'text': value, 'xValue': xValue, 'yValue': yValue}]);
		handleBlur();
	};
	const placeholderStyle = `
		input::placeholder {
			color: ${theme === 'light' ? 'black' : 'white'};
		}
	`;
	return (
		<div style={containerStyle} onKeyDown={handleTilde} tabIndex={0} ref={parentElement}>
			<style>{placeholderStyle}</style>

			{uiProps.showSearchIcon ? (
				<IoSearch style={searchIconStyle} onClick={()=> showSearch("")} />
			) : (
				<input
					type="text"
					placeholder="Search"
					style={inputStyle}
					onFocus={handleFocus}
					onBlur={handleBlur}
					ref={inputElement}
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
				/>
			)}
			{textChunks && (
			  textChunks.map((item, index) => (
				<span key={index} style={{ ...textChunkStyle, position: 'fixed', top: `${item.xValue}vh`, left: `${item.yValue}vw` }}>
				  {item.text}
				</span>
			  ))
			)}


		</div>
	);
}
