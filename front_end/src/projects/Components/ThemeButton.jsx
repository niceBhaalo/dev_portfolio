import React, {useState, useEffect, useContext} from 'react';
import { ThemeContext, themes } from '../../contexts/ThemeContext.jsx';
import { useLocation} from 'react-router-dom';

export default function ThemeButton ({changeTheme}) {
	  const location = useLocation();
  const [showThemeButton, setShowThemeButton] = useState(location.pathname !== '/randomizeColors');

  useEffect(() => {
	  if (location.pathname === '/randomizeColors') {
		  setShowThemeButton(false);
	  } else {
		  setShowThemeButton(true);
	  }
  }, [location.pathname]);
  
	const theme = useContext(ThemeContext);

	return (
		showThemeButton ? <button className="ThemeButton" onClick={changeTheme}>{theme === 'light' ? "Dark" : "Light"}</button> : null
	
	);
}
