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

	return (
		<div className={`ParentDiv ${theme}`}>
	  <h1 className={`HomeTitle ${theme}`}>Welcome to the Home Page</h1>
      <nav>
        <div className="LinksContainer">
            <Link className={`Links ${theme}`} to="/esignature">Esignature</Link>
            <Link className={`Links ${theme}`}  to="/birthdays">Birthdays</Link>
            <Link className={`Links ${theme}`}  to="/randomizeColors">Colors</Link>
			<Link className={`Links ${theme}`}  to="/polling">Polls</Link>
			<Link className={`Links ${theme}`}  to="/imageMetaData">Check Image Meta Data</Link>
			<Link className={`Links ${theme}`}  to="/likeMyPhoto">Like My Photo</Link>
			<Link className={`Links ${theme}`}  to="/temperatureShowcase">Compare Temperature</Link>
			<Link className={`Links ${theme}`} to="/sliderPuzzle">Slider Puzzle</Link>
			<Link className={`Links ${theme}`} to="/searchBar">Search Bar</Link>
			<Link className={`Links ${theme}`} to="/popups">Popups</Link>
			<Link className={`Links ${theme}`} to="/progressBars">Progress Bars</Link>
			<Link className={`Links ${theme}`} to="/subscribe">Subscribe Implementation</Link>
			<Link className={`Links ${theme}`} to="/movies">Movies Database</Link>

        </div>
      </nav>
    </div>
  );
}

export default App;
