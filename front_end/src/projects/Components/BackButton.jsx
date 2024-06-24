import React, {useState, useEffect} from 'react';
import { Link, useLocation} from 'react-router-dom';

export default function BackButton() {
  const location = useLocation();
  const [showBackButton, setShowBackButton] = useState(location.pathname !== '/');
  
  useEffect(() => {
    setShowBackButton(location.pathname !== '/');
  }, [location.pathname]);

  return showBackButton ? <Link to="/" className="back-button">Back</Link> : null;
}
