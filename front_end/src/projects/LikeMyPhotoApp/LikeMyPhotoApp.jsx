import React, { useState, useRef, useContext } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import LikePhotoCard from "../Components/LikePhotoCard.jsx"
import './LikeMyPhotoAppCSS.css';
import {ThemeContext, themes } from '../../contexts/ThemeContext.jsx';

export default function LikeMyPhotoApp () {
		const theme = useContext(ThemeContext);

	const imageRef = useRef(null);	
	const [images, setImages] = useState([]);
	
	const handleImageChange = (event) => {
	    const files = Array.from(event.target.files);
		setImages(images.concat(files));
		console.log(images.concat(imageRef.current.files));
	};
    const handleButtonClick = () => {
        imageRef.current.click(); // Trigger file input click when custom button is clicked
    };

	return (
		<div className={`LikeMyPhotoContainer ${theme}`}>
			<h1 className="LikeMyPhotoTitle">Upload and Like Photo Implementation</h1>
			<div className="LikeMyPhotoCards">
				{images && (images.map((image, index) =>
					<LikePhotoCard key={index} image={image} />
				))}
				<div className="LikeMyPhotoNewImage">
					<CiCirclePlus className="LikeMyPhotoNewImageButton" onClick={handleButtonClick}/>
					<input style={{ display: 'none'}} type="file" ref={imageRef} accept="image/*" onChange={handleImageChange} multiple/>
				</div>

			</div>
		</div>
	
	);
}
