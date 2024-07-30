import React, {useState, useContext} from 'react';
import {ThemeContext} from '../../contexts/ThemeContext.jsx';
import './MoviesDatabase.css';
import LogInComponent from './LogInComponent.jsx';
import InputCard from './InputCard.jsx';
import DisplayCards from './DisplayCards.jsx';
import SearchBar from './SearchBar.jsx';
export default function MoviesDatabase() {

	const theme = useContext(ThemeContext);
	const light = '#ffcfcc';
	const dark = '#1a0f0e';
	const [activeDatabase, setActiveDatabase] = useState("");
	const [showLogin, setShowLogin] = useState(true);
	const [showClose, setShowClose] = useState(false);
	const [showInputCards, setShowInputCards] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0); // This state will trigger the re-render
	const [disableEntryButton, setDisableEntryButton] = useState(false);
	const [searchString, setSearchString] = useState("");
	const [cardFilters, setCardFilters] = useState([]);
	let parentDivStyle = {
		backgroundColor: theme === 'light' ? light : dark,
		color: dark,
	};
	let newEntryButtonStyle = {
		backgroundColor: theme === 'light' ? dark : light,
		color: theme === 'light' ? light : dark,
	};

	const showDatabase = (value) => {
		setActiveDatabase(value);
		setShowLogin(false);
		setShowClose(true);
	};
	const onClose = () => {
		setShowLogin(false);
	};
	const handleNewEntry = () => {
		if (!disableEntryButton) {
			setShowInputCards(true);
		}
	};
	const handleFormSubmit = () => {
		setShowInputCards(false);
		setRefreshKey(prevKey => prevKey + 1); // Increment the refresh key to trigger re-render
	};
	  const handleShowEditCardChange = (newValue) => {
	  console.log(newValue);
		setDisableEntryButton(newValue); // Update showInputCards based on showEditCard value
	  };
	return (
		<div 
			className="parentDivMain"
			style={parentDivStyle}
		>
		{showLogin && 
			<LogInComponent 
			onServerResponse={showDatabase}
			showClose={showClose}
			onClose={onClose}
		/>}
		{showInputCards && 
			<InputCard 
				onSubmit={handleFormSubmit}
				currentUser={activeDatabase}
				onCancel={()=>setShowInputCards(false)}
			/>
		}
		{!showInputCards && activeDatabase !== "" && <div 
			className="showInputCardButton"
			style={newEntryButtonStyle}
			onClick={handleNewEntry}
			>
				New Entry
			</div>
		}
		
		{activeDatabase !== "" && <>
			<SearchBar 
			
			onSearchChange={(value)=>setSearchString(value)}
			onFilterChange={(values)=>setCardFilters(values)}
			/>
			<DisplayCards 
				currentUser={activeDatabase} 
				refreshKey={refreshKey} 
				refreshDB={()=>setRefreshKey(prevKey => prevKey + 1)}
				cardFilters={cardFilters}
				searchString={searchString}
				onShowEditCardChange={handleShowEditCardChange}
				buttonDisabled={showInputCards}
			/>
			</>
		}
		</div>
	);
}
