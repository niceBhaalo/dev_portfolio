import React, {useState, useEffect, useContext} from 'react';
import {ThemeContext} from '../../contexts/ThemeContext.jsx';
import axios from 'axios';
import DisplayCard from './DisplayCard.jsx';
import InputCard from './InputCard.jsx';
import MasonryGrid from './MasonryGrid.jsx';

export default function DisplayCards ({ currentUser, refreshKey, refreshDB, searchString, cardFilters, buttonDisabled, onShowEditCardChange}) {

    const theme = useContext(ThemeContext);
    const light = '#9beafa';
    const dark = '#11292e';
    const lightText = "#c9f6ff";
    
    const [displayData, setDisplayData] = useState([]);
    const [showEditCard, setShowEditCard] = useState(false);
    const [editData, setEditData] = useState({});
    const [uniqueKey, setUniqueKey] = useState("");
	const [editIndex, setEditIndex] = useState();
	const [showDeleteDialogBox, setShowDeleteDialogBox] = useState(false);

    useEffect(()=> {
		getDataFromDB();
	}, [currentUser, refreshKey]);

	const resetDisplayData = (documents) => {
	  setDisplayData([]);
	  setTimeout(() => {
		setDisplayData(documents);
	  }, 0);
	};

    const getDataFromDB = async () => {
	try {
	  const response = await axios.post('/api/get-documents', { databaseID: currentUser });

	  if (response.status === 200) {
		const documents = response.data;
		resetDisplayData(documents);
	  } else {
		console.log('Unexpected status code:', response.status);
	  }
	} catch (error) {
	  if (error.response) {
		console.error('Error response data:', error.response.data);
		console.error('Error response status:', error.response.status);
		console.error('Error response headers:', error.response.headers);
		if (error.response.status === 500) {
		  console.error('Server error occurred.');
		} else {
		  console.error('Unhandled error response status:', error.response.status);
		}
	  } else if (error.request) {
		console.error('No response received:', error.request);
	  } else {
		console.error('Error in setting up request:', error.message);
	  }
	}
	};
	
	const setEditCard = (item, index) => {
		console.log(item);
		setEditData(item.JSONObject);
		setUniqueKey(item.UniqueKey);
		setShowEditCard(true);
		setEditIndex(index);
	};
	
	const updateDisplayData = (newData) => {
		
		setShowEditCard(false);
		setDisplayData(prevDisplayData => {
			const updatedDisplayData = [...prevDisplayData];
			updatedDisplayData[editIndex] = {
				...updatedDisplayData[editIndex],
				JSONObject: newData
			};
			return updatedDisplayData;
		});
	};
	
	const deleteCardDialogBox = (item, index) => {
		setEditIndex(index);
		setShowDeleteDialogBox(true);
		console.log(displayData[index]);
	};
	const deleteCard = () => {
		setShowDeleteDialogBox(false);

		const deleteFromDB = async () => {
		  try {
			const response = await axios.post('/api/delete-documents', { databaseID: currentUser, uniqueKey: displayData[editIndex].UniqueKey });
			if (response.status === 200) {
				getDataFromDB();
			  console.log(response.data.message);
			} else {
			  console.error('Unexpected response status:', response.status);
			}
		  } catch (error) {
			if (error.response) {
			  console.error('Error response:', error.response.data.message);
			} else if (error.request) {
			  console.error('Error request:', error.request);
			} else {
			  console.error('Error:', error.message);
			}
		  }
		};
		deleteFromDB();

	};
	const duplicateCard = async (item, index) => {
		try {
		const response = await axios.post('/api/new-entry', {
		  formData: JSON.stringify(item.JSONObject),
		  databaseID: currentUser
		});
		  if (response.status === 200) {
			getDataFromDB();
			console.log('Entry updated successfully.');
		  } else if (response.status === 201) {
			getDataFromDB();
			console.log('Entry created successfully.');
		  } else if (response.status === 404) {
			console.log('Entry not found.');
		  } else {
			console.log('Unexpected status code:', response.status);
		  }
		} catch (error) {
		  if (error.response) {
			console.error('Error response data:', error.response.data);
			console.error('Error response status:', error.response.status);
			console.error('Error response headers:', error.response.headers);
			
			if (error.response.status === 500) {
			  console.error('Server error occurred.');
			} else {
			  console.error('Unhandled error response status:', error.response.status);
			}
		  } else if (error.request) {
			console.error('No response received:', error.request);
		  } else {
			console.error('Error in setting up request:', error.message);
		  }
		}
		
	};
	useEffect(()=> {
		onShowEditCardChange(showEditCard);
	}, [showEditCard]);
	const [updateGrid, setUpdateGrid] = useState(false);
	const updateMasonryGrid = () => {
		setUpdateGrid((prev) => !prev);
	};
	return (
		<MasonryGrid filter={cardFilters} displayData={displayData} updateGrid={updateGrid}>
			<div className="DisplayCardsContainer">
				{displayData.map((item,index)=>(
					<DisplayCard 
					key={item.uniqueKey} 
					data={item} 
					filter={cardFilters} 
					callEdit={()=>setEditCard(item, index)} 
					callDelete={()=>deleteCardDialogBox(item,index)}
					duplicateCard={()=>duplicateCard(item, index)}
					buttonDisabled={showEditCard || buttonDisabled}
					imageFetched={()=>updateMasonryGrid()}
					/>
				))}
				{showEditCard && 
					<InputCard 
						onSubmit={(newData)=>updateDisplayData(newData)}
						onCancel={()=>setShowEditCard(false)}
						currentUser={currentUser}
						editData={editData}
						uniqueKey={uniqueKey}
					/>
				}
				{showDeleteDialogBox && <div className="DeleteDialogBox">
					<div>
						Are You Sure You Want to Delete This Card?
					</div>
					<div className="dbDeleteButtonContainer">
						<button className="dbDeleteButton" onClick={deleteCard}>Yes</button>
						<button className="dbDeleteButton" onClick={()=>setShowDeleteDialogBox(false)}>No</button>
					</div>
				</div>}			
			</div>
		</MasonryGrid>
	);
}
