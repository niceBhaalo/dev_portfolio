import './sass/main.scss';
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
import OtherSkills from './projects/OtherSkills/OtherSkills.jsx';
import ProjectCard from "./projects/Components/ProjectCard.jsx";

import {ThemeContext, themes } from './contexts/ThemeContext.jsx';

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
			<Route path="/other" element={<OtherSkills />} />

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
	
	const allProjects = [
	{
		"route": "/esignature",
		"name": "Date of Births Database",
		"description": "Store and fetch Name and Date pairs from the database.",
		"skills": {
			"React": ["Use State", "Use Context", "Text Input", "Date Input", "Use Axios"], 
			"NodeJS": ["Use Express", "Use Cors", "Use MongoClient", "Authenticate into a MongoDB", "Recieve Axios Request"],
			"MongoDB": ["Insert One", "Count Document", "Find One", "Find Query"], "Express": []}
	},
	{
		"route": "/randomizeColors",
		"name": "Create Color Schemes",
		"description": "Use randomness to create color schemes of your choosing.",
		"skills": {
			"React": ["Use Navigator Clipboard", "Use Effect", "Use FontAwesomeIcons"] 
		}
	},
	{
		"route": "/polling",
		"name": "Answer Online Polls",
		"description": "Participate in Online Polls and see their results.",
		"skills": {"React": ["Use Memo", "Use Axios", "Use Ref"], 
			"NodeJS": ["Use MongoClient", "Recieve Axios Requests"], 
			"MongoDB": ["Use Find One", "Use Update One"], "Express": []}
	},
	{
		"route": "/imageMetaData",
		"name": "Check Image Meta Data",
		"description": "A tool to find all available metadata on your images",
		"skills": {"React": ["Use Exif-JS Library", "Use FileReader" ], "NodeJS": [], "MongoDB": [], "Express": []}

	},
	{
		"route": "/likeMyPhoto",
		"name": "The Image Gallery",
		"description": "A simple image upload and flexbox demonstration.",
		"skills": {"React": ["Use State", "Use Flexbox", "Use React-Icons"], "NodeJS": [], "MongoDB": [], "Express": []}

	},
	{
		"route": "/temperatureShowcase",
		"name": "Temperature Comparer",
		"description": "Fetch Temperature data from a weather api and compare temperatures between locations.",
		"skills": {"React": ["Use Axios", "Use State", "Use Effect", "Use Set Interval"], "NodeJS": ["Manage Third-Party API Connection", "Cache Request Data"], "MongoDB": [], "Express": []}
	},
	{
		"route": "/sliderPuzzle",
		"name": "The Slider Puzzle",
		"description": "Move the Sliders to solve the puzzle",
		"skills": {"React": ["Use Input Slider", "Use Partial State Update", "Use Effect"], "NodeJS": [], "MongoDB": [], "Express": []}
			
	},
	{
		"route": "/searchBar",
		"name": "The Search Bar",
		"description": "A Simple Search Bar Implementation and Triggers.",
		"skills": {"React": ["Use Text Input", "Use React Icons", "Use Ref"], "NodeJS": [], "MongoDB": [], "Express": []}
	},
	{
		"route": "/popups",
		"name": "The Pop Up Game",
		"description": "Pop The Balloons in their descending order before it gets too overwhelming. Mistakes beware.",
		"skills": {"React": ["Use Effect", "Use Set Timeout", "Generate Random Positions"], "NodeJS": [], "MongoDB": [], "Express": []}

	},
	{
		"route": "/progressBars",
		"name": "The Simple Progress Bars",
		"description": "A simple implementation of progress bars and input fields.",
		"skills": {"React": ["Use State", "Use Effect", "Use Set Timeout", "Use Input Range"], "NodeJS": [], "MongoDB": [], "Express": []}

	},
	{
		"route": "/subscribe",
		"name": "Subscribe and Unsubscribe",
		"description": "An implementation of a Subscribe and Unsubscribe popup.",
		"skills": {"React": ["Use StateMachine", "Use Effect", "Validate Form Input"], "NodeJS": [], "MongoDB": [], "Express": []}

	},
	{
		"route": "/movies",
		"name": "Create Your Own Database",
		"description": "Create your personal database to record movies, books, and seasons.",
		"skills": {
			"React": ["Use Input Form", "Authenticate User", "Create User Account", "Use Masonry Layout", "Dynamic Form Inputs", "Use Axios Requests"], 
			"NodeJS": ["Use Bcrypt for Passwords", "Use Multer", "Use GridFS", "Use UUID", "Use Readable"], 
			"MongoDB": ["Validate Schema", "Store Photos", "Use Update One", "Use Insert One", "Use Delete One"], 
			"Express": []}	
	},
	{
		"route": "/other",
		"name": "What other skills I know",
		"description": "Click here for an overview of all my skills",
		"skills": {"React": [], "NodeJS": [], "MongoDB": [], "Express": []}
	}
	];
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
			"Authenticate into your own database."],
	},
	{
		"route": "/other",
		"name": "What other skills I know",
		"description": ["Click here for an overview of what other things I know how to do"]
	}
	];
	return (
		<div className={`home ${theme}`}>
			<div className={`header ${theme}`}>
				<div className="header__content">
					<h1 className="heading-primary">
						<span className={`heading-primary--main ${theme}`}>Fazeel Ahmed</span>
						<span className={`heading-primary--sub ${theme}`}>Full-Stack Portfolio</span>
					</h1>
					<a href="#" className={"btn btn--white btn--animation-up"}>Get Started</a>
				</div>
			</div>
			<nav className="width-100">
			
			<div className="width-100">
				{
					allProjects.map(item => (
						<ProjectCard 
							key={item.route} 
							data={item}
						/>
				))
			}
			</div>
      </nav>
    </div>
  );
}

export default App;
