import React, {useState, useEffect, useContext} from 'react';
import './SliderPuzzleApp.css';
import Slider from './Slider.jsx';
import { ThemeContext } from '../../contexts/ThemeContext.jsx';

export default function SliderPuzzleApp () {

	const theme = useContext(ThemeContext);
	const [disabled, setDisabled] = useState(false);
	const [disabled2, setDisabled2] = useState(false);
	
	//const [secondInstruction, setSecondInstruction] = useState(false);
	const [sliders, setSliders] = useState({
		slider1: 90,
		slider2: 50,
		slider3: 10,
		slider4: 50
	});

	const [sliders2, setSliders2] = useState ({
		slider1: 25,
		slider2: 73,
		slider3: 10
	});
	
	useEffect (()=>{
		let solutionCheck = Object.values(sliders).every(value => value === 50) && Object.values(sliders2).every(value => value === 50);
		if (solutionCheck) {
			setDisabled(true);
			console.log("Solution Found");
		}
		}, [sliders, sliders2]);
	const handleSliderChange = (sliderName, newValue) => {
		adjustOtherSliders(sliderName, newValue, sliders[sliderName]);
		
		setSliders({ ...sliders, [sliderName]: newValue });
	};

	const adjustOtherSliders = (changedSlider, newValue, oldValue) => {
		// let toChange = []
		if (changedSlider === 'slider1') {
			setSliders2({ ...sliders2, ['slider1']: Math.min(100, Math.max(0, sliders2['slider1']+(oldValue-newValue))) });
		}
		if (changedSlider === 'slider2') {
			setSliders2({ ...sliders2, ['slider1']: Math.min(100, Math.max(0, sliders2['slider1']+(oldValue-newValue))),
				 ['slider2']: Math.min(100, Math.max(0, sliders2['slider2']+(newValue-oldValue)))
		 });
	 }
		if (changedSlider === 'slider3') {
			setSliders2({ ...sliders2, ['slider1']: Math.min(100, Math.max(0, sliders2['slider1']+(oldValue-newValue))),
				 ['slider2']: Math.min(100, Math.max(0, sliders2['slider2']+(newValue-oldValue))),
				 ['slider3']: Math.min(100, Math.max(0, sliders2['slider3']+(oldValue-newValue)))
		 });
	 }
		if (changedSlider === 'slider4') {
			setSliders2({ ...sliders2, ['slider1']: Math.min(100, Math.max(0, sliders2['slider1']+(newValue-oldValue))),
				 ['slider3']: Math.min(100, Math.max(0, sliders2['slider3']+(oldValue-newValue)))
		 });		 
		}
	};

  return (
	<div className={`SliderPuzzleContainer ${theme}`}>
		<div className="SliderText">
			<div className="SliderTitle">
				Slider Puzzle
			</div>
			<div className="SliderInstructions">
				Set all Sliders to their Center Mark
			</div>
			{disabled2 && (
				<div className="SliderInstructions">
					Cannot Move The Last Three Sliders Directly
				</div>
			)}
		</div>
		<div className="SlidersContainer">
		  {Object.keys(sliders).map((sliderName, index) => (
			<Slider 
			  key={index}
			  sliderValue={sliders[sliderName]} 
			  handleSliderChange={(event) => handleSliderChange(sliderName, parseInt(event.target.value))} 
			  disabled={disabled}
			/>
		  ))}
		</div>
		<div className="SlidersContainer">
			  {Object.keys(sliders2).map((sliderName, index) => (
			<Slider 
			  key={index}
			  sliderValue={sliders2[sliderName]}
			  handleSliderChange={() => setDisabled2(true)}
			  disabled={disabled2}
			/>
		  ))}
		</div>
		<div className="SliderText">
			{disabled && (<div className="SliderInstructions">
				Solution Found
			</div>)}
		</div>
	</div>
  );
}
