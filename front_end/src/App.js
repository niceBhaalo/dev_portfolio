import './App.css';
import EsignatureApp from "./projects/ESignatureApp/EsignatureApp.jsx";
import BirthsdayApp from "./projects/BirthdaysApp/BirthdaysApp.jsx";
import RandomizeColorsApp from "./projects/RandomizeColorsApp/RandomizeColorsApp.jsx";
import PollingApp from "./projects/PollingApp/PollingApp.jsx";
import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import BackButton from "./projects/Components/BackButton.jsx";
import ImageMetaDataApp from './projects/ImageMetaDataApp/ImageMetaDataApp.jsx';
import LikeMyPhotoApp from './projects/LikeMyPhotoApp/LikeMyPhotoApp.jsx';
import TemperatureShowcaseApp from './projects/TemperatureShowcaseApp/TemperatureShowcaseApp.jsx';
import ThemeButton from './projects/Components/ThemeButton.jsx';
import SliderPuzzleApp from './projects/SliderPuzzleApp/SliderPuzzleApp.jsx';
import SearchBarApp from './projects/SearchBarApp/SearchBarApp.jsx';
import PopupsApp from './projects/PopupsApp/PopupsApp.jsx';
import ProgressBarsApp from './projects/ProgressBarsApp/ProgressBarsApp.jsx';
import SubscribeApp from './projects/SubscribeApp/SubscribeApp.jsx';
import MoviesDatabase from './projects/MoviesDatabase/MoviesDatabase.jsx';

import {ThemeContext, themes } from './contexts/ThemeContext.jsx';
//Changed
function App() {

	const [theme, setTheme] = useState(themes.light);
	const changeTheme = () => {
		if (theme === themes.light) {
			setTheme(themes.dark);
		}
		else {
			setTheme(themes.light);
		}
	};
  return (
	<Router>
		<ThemeContext.Provider value={ theme }>
		<div className="App">
			<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/esignature" element={<EsignatureApp />} />
			<Route path="/birthdays" element={<BirthsdayApp />} />
			<Route path="/randomizeColors" element={<RandomizeColorsApp />} />
			<Route path="/polling" element={<PollingApp />} />
			<Route path="/imageMetaData" element={<ImageMetaDataApp />} />
			<Route path="/likeMyPhoto" element={<LikeMyPhotoApp />} />
			<Route path="/temperatureShowcase" element={<TemperatureShowcaseApp />} />
			<Route path="/sliderPuzzle" element={<SliderPuzzleApp />} />
			<Route path="/searchBar" element={<SearchBarApp />} />
			<Route path="/popups" element={<PopupsApp />} />
			<Route path="/progressBars" element={<ProgressBarsApp />} />
			<Route path="/subscribe" element={<SubscribeApp />} />
			<Route path="/movies" element={<MoviesDatabase />} />

			</Routes>
			<div className="HomeButtons">
				<ThemeButton changeTheme={changeTheme}/>
				<BackButton />
			</div>
		</div>
		</ThemeContext.Provider>
	</Router>
	);
}

function Home() {
	const theme = useContext(ThemeContext);
	
	const allLinks = [
	{
		"route": "/esignature",
		"name": "Date of Births Database",
		"description": ["Enter Your Name and DoB into a mongoDB.", 
			"Query for people or dates from the database.", 
			"Uses axios, useState and useEffect."]
	},
	{
		"route": "/randomizeColors",
		"name": "Create Color Mixtures for Inspiration",
		"description": ["Click on the hexcodes to generate a new random color.", 
			"Use the arrow buttons to view previous colors.", 
			"Uses fortawesome icons."]
	},
	{
		"route": "/polling",
		"name": "Online Polls",
		"description": ["Answer some questions to see where your stand among the population.", 
			"Fetches polls and their results from the database.", 
			"Uses useMemo and useRef."]
	},
	{
		"route": "/imageMetaData",
		"name": "Check Image Meta Data",
		"description": ["Upload an image to check any meta data attached to it.",
			"Can upload multiple images at once.", 
			"Can remove images."]
	},
	{
		"route": "/likeMyPhoto",
		"name": "Image Gallery",
		"description": ["Upload images to a gallery", 
			"Like images", 
			"Uses react-icons."]
	},
	{
		"route": "/temperatureShowcase",
		"name": "Temperature Comparer",
		"description": ["Set a temperature and see which is the closest city with the same temperature.",
			"Uses weatherapi.com for temperature data."]
	},
	{
		"route": "/sliderPuzzle",
		"name": "The Slider Puzzle",
		"description": ["Move the sliders until all sliders are exactly at their center point.",
			"Uses slider webkit."]
	},
	{
		"route": "/searchBar",
		"name": "Implementation of a Search Bar",
		"description": ["Open the search bar my typing or pressing the icon.", 
			"Press enter to enter the text or click outside to exit.", 
			"Uses useContext."]
	},
	{
		"route": "/popups",
		"name": "The Pop Up Game",
		"description": ["Click on the largest numbered balloon on the screen to pop it.", 
			"Pop all the balloons to win.", 
			"Popping the wrong balloon incurs a penalty."]
	},
	{
		"route": "/progressBars",
		"name": "Simple Progress Bars",
		"description": ["Linking inputs to Progress Bars.", 
			"Simple implementation, nothing fancy.", 
			"Uses Math.Random and useEffect"]
	},
	{
		"route": "/subscribe",
		"name": "Subscribe and Unsubscribe",
		"description": ["Popping up a notification for the user to sign in with their email", "Option to unsubscribe"]
	},
	{
		"route": "/movies",
		"name": "Create Your Own Database",
		"description": ["Store your favorite books, movies, and seasons and all their details in an online database.", 
			"Search through your database for any entered details.", 
			"Authenticate into your own database."]
	},
	{
		"route": "/otherSkills",
		"name": "What other skills I know",
		"description": ["Click here for an overview of what other things I have done for this portfolio"]
	}
	];
	return (
		<div className={`ParentDiv ${theme}`}>
	  <h1 className={`HomeTitle ${theme}`}>Welcome to the niceBhaalo&apos;s Web Development Portfolio</h1>
	  <h2 className={`HomeTitle ${theme}`}>Below are some of my little mini apps to show what I have learnt so far</h2>
      <nav>
        <div className="LinksContainer">
			{
				allLinks.map(item => (
					<div key={item.route} className={`LinkContainer ${theme}`}>
						<div className="LinkButtonContainer">
							<Link className={`Links ${theme}`} to={item.route}>{item.name}</Link>
						</div>
						<div className={`InstructionsContainer ${theme}`}>
							{
								item.description.map(instruction => (
									<div key={instruction} className={`Instruction ${theme}`}>
									{instruction}
									</div>
								))
							}
						</div>
					</div>
				))
			}
        </div>
      </nav>
    </div>
  );
}

export default App;
