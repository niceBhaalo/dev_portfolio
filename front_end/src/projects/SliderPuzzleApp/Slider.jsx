import React, {useContext} from 'react';
	
import { ThemeContext } from '../../contexts/ThemeContext.jsx';



export default function Slider ({sliderValue, handleSliderChange, disabled}) {
	const theme = useContext(ThemeContext);

  const handleChange = (event) => {
    if (handleSliderChange) {
      handleSliderChange(event); // Pass the event object
    }
  };

	return <div className="SliderBackground"><input 
		className={`Slider ${theme} ${sliderValue === 50 ? 'green-thumb' : ''}`}
		type="range" 
		min={0} max={100} 
		value={sliderValue} 
		onChange={handleChange} 
		readOnly={handleSliderChange ? false : true}
		disabled={disabled}
		/>
		</div>

}
