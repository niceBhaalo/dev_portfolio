import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext.jsx';
import { FaBook } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";
import { PiTelevision } from "react-icons/pi";
import axios from 'axios';

export default function DisplayCard({ data, filter, callEdit, callDelete, duplicateCard, buttonDisabled, imageFetched }) {
  const theme = useContext(ThemeContext);
  const light = '#9beafa';
  const dark = '#11292e';
  const lightText = "#c9f6ff";

  const [displayCard, setDisplayCard] = useState(true);
  const [imageURL, setImageURL] = useState('');

  const [displayData, setDisplayData] = useState({
    prequels: '',
    prequelsName: '',
    sequels: '',
    sequelsName: '',
    spinoffs: '',
    spinoffsName: [],
    specials: '',
    specialsName: [],
    cast: '',
    castName: [],
    creator: '',
    creatorDesignation: '',
    icon: '',
    title: '',
    year: '',
    rating: '',
    universe: '',
    universeName: '',
    picture: '',
    tags: [],
  });

  const iconMapping = {
    book: <FaBook />,
    movie: <BiSolidCameraMovie />,
    series: <PiTelevision />,
  };
	async function fetchImage(fileID) {
	
	  try {
		const response = await axios.post('/api/get-image', { fileID: fileID }, { responseType: 'blob' });

		if (response.status === 200) {
		  const url = URL.createObjectURL(response.data);
        setImageURL(url); // Set the image URL state
        imageFetched();
		}
	  } catch (error) {
		console.error('Error fetching image:', error);
	  }
	}

  useEffect(() => {
    const updateData = () => {
      const type = data.JSONObject.type;
      let updatedData = {
        ...displayData, // Ensure we are spreading the current state
        type,
        title: data.JSONObject.title,
        year: data.JSONObject.year,
        rating: data.JSONObject.rating,
        universe: data.JSONObject.universe,
        universeName: data.JSONObject.universeName,
        picture: data.JSONObject.picture,
        tags: data.JSONObject.tags
      };
      if (type === 'Movie') {
        updatedData = {
          ...updatedData,
          icon: 'movie',
          prequels: data.JSONObject.prequelMovie,
          prequelsName: data.JSONObject.prequelMovieName,
          sequels: data.JSONObject.sequelMovie,
          sequelsName: data.JSONObject.sequelMovieName,
          creator: data.JSONObject.director,
          creatorDesignation: 'Director',
          cast: data.JSONObject.castMovie,
          castName: data.JSONObject.castMovieName,
		spinoffs: '',
		spinoffsName: [],
		specials: '',
		specialsName: [],
        };
      } else if (type === 'Book') {
        updatedData = {
			...updatedData,
			icon: "book",
			prequels: data.JSONObject.prequelBook,
			prequelsName: data.JSONObject.prequelBookName,
			sequels: data.JSONObject.sequelBook,
			sequelsName: data.JSONObject.sequelBookName,
			creator: data.JSONObject.author,
			creatorDesignation: 'Author',
			spinoffs: '',
			spinoffsName: [],
			specials: '',
			specialsName: [],
			cast: '',
			castName: [],
        };
      } else if (type === 'Series') {
        updatedData = {
          ...updatedData,
          icon: 'series',
          spinoffs: data.JSONObject.spinoffs,
          spinoffsName: data.JSONObject.spinoffsName,
          specials: data.JSONObject.specials,
          specialsName: data.JSONObject.specialsName,
          creator: data.JSONObject.showrunner,
          cast: data.JSONObject.castSeries,
          castName: data.JSONObject.castSeriesName,
          creatorDesignation: 'Showrunner',

		prequels: '',
		prequelsName: [],
		sequels: '',
		sequelsName: [],
		cast: '',
		castName: [],          
        };
      }

	const imageFileID = data.JSONObject.picture;
	if (data.JSONObject.picture !== '') {
		fetchImage(imageFileID);
	}
      setDisplayData(updatedData);
    };

    updateData();
    console.log(data);
  }, [data]);

	useEffect(()=>{
		setDisplayCard(filter[data.JSONObject.type] === 'Yes' ? true : false);
		console.log(filter);
		console.log(data.JSONObject.type);
		}, [filter]);
		
  return (
	<>
		{displayCard===true && (<div className="CardContainer">
			<div className="CardTitle">
				{displayData.title}&nbsp;({displayData.year})
				{iconMapping[displayData.icon]}
			</div>
			{filter.Picture === 'Yes' && imageURL && (
				<div className="CardPicture">
					<img id="image" src={imageURL} alt="Uploaded" />
				</div>
			)}
			{filter.Data === 'Yes' && 
				<div className="CardData">
					{filter.Creators === 'Yes' && displayData.creator && (<span>{displayData.creatorDesignation}:&nbsp;{displayData.creator}</span>)}
					{filter.Rating === 'Yes' && displayData.rating && (<span>Rating: {displayData.rating}</span>)}
					{filter.Universe === 'Yes' && displayData.universe === "Yes"  && (<span>Universe:&nbsp;{displayData.universeName}</span>)}

					{filter.Prequels === 'Yes' && displayData.prequels === "Yes" && (<span>Prequels: {displayData.prequelsName}</span>)}
					{filter.Sequels === 'Yes' && displayData.sequels === "Yes"  && (<span>Sequels: {displayData.sequelsName}</span>)}
					{filter.SpinOffs === 'Yes' && displayData.spinoffs === "Yes" && (
						<div>
							<span>Spin-Offs:&nbsp;</span>
							{displayData.spinoffsName.map((name, index) => (
							(name !== "" && <span key={index}>{name},&nbsp;</span>)
							))}
						</div>
					)}
					{filter.Specials === 'Yes' && displayData.specials === "Yes" && (
						<div>
							<span>Specials:&nbsp;</span>
							{displayData.specialsName.map((name, index) => (
							(name !== "" && <span key={index}>{name},&nbsp;</span>)
							))}
						</div>
					)}
					{filter.Cast === 'Yes' && displayData.cast === "Yes" && (
						<div>
							<span>Cast:&nbsp;</span>
							{displayData.castName.map((name, index) => (
							(name !== "" && <span key={index}>{name},&nbsp;</span>)
							))}
						</div>
					)}
					{filter.Tags === 'Yes' && displayData.tags && displayData.tags.length > 0 && (
						<div>
							<span>Tags:&nbsp;</span>
							{displayData.tags.map((tag, index) => (
							(tag !== "" && <span key={index}>{tag},&nbsp;</span>)
							))}
						</div>
					)}
				</div>
			}
			{filter.Buttons === 'Yes' && 
				<div className="dbCardButtonContainer">
					<button className="dbCardButton" onClick={callEdit} disabled={buttonDisabled}>Edit</button>
					<button className="dbCardButton" onClick={callDelete} disabled={buttonDisabled}>Delete</button>
					<button className="dbCardButton" onClick={duplicateCard} disabled={buttonDisabled}>Duplicate</button>
				</div>
			}
			</div>)
		}
	</>
  );
}
