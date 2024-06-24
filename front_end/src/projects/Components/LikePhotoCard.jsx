import React, { useState, useContext } from 'react';
import { GrLike } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import {ThemeContext, themes } from '../../contexts/ThemeContext.jsx';

export default function LikePhotoCard ({ image }) {
			const theme = useContext(ThemeContext);

	const [likeState, setLikeState] = useState(false);

    const toggleLike = () => {
		if(image) {
			setLikeState(like=>!likeState);
		} else {
			console.log("No Image To Like");
		}
    };
    return (image && (
		<div className="LikeMyPhotoCard">
			<div className={`LikeMyPhotoHeader ${theme}`}>
				<GrLike className="LikeMyPhotoHeaderIcon"/>
				{image && (
					<span className="LikeMyPhotoText">{image.name}</span>
				)}
			</div>
			<div className="LikeMyPhotoImageContainer">
				{image && (
					<img className="LikeMyPhotoImage" src={URL.createObjectURL(image)} onDoubleClick={toggleLike} alt="Problem Displaying"/>
				)}

			</div>
			<div className={`LikeMyPhotoFooter ${theme}`}>
				{likeState && (
					<FaHeart className="LikeMyPhotoHeartIcon" style={{color: 'red'}} onClick={toggleLike}/>
				)}
				{!likeState && (
					<CiHeart className="LikeMyPhotoHeartIcon" onClick={toggleLike}/>
				)}
			</div>
		</div>
    )
    );

}
