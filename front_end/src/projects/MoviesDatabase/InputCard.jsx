import React, {useState, useContext} from 'react';
import {ThemeContext} from '../../contexts/ThemeContext.jsx';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormSpecials from './FormSpecials';
import axios from 'axios';

export default function InputCard ({onSubmit, currentUser, editData, uniqueKey, onCancel}) {

    const theme = useContext(ThemeContext);
    const light = '#9beafa';
    const dark = '#11292e';
    const lightText = "#c9f6ff";

    const [errorMessage, setErrorMessage] = useState("none");
    const [formData, setFormData] = useState({
        title: '',
        year: '',
        type: '',
        author: '',
        director: '',
        showrunner: '',
        seasons: '',
        prequelMovie: '',
        sequelMovie: '',
        prequelMovieName: '',
        sequelMovieName: '',
        prequelBook: '',
        sequelBook: '',
        prequelBookName: '',
        sequelBookName: '',
        spinoffs: '',
        spinoffsName: [],
        universe: '',
        universeName: '',
        specials: '',
        specialsName: [],
        picture: '',
        rating: '',
        castMovie: '',
        castMovieName: [],
        castSeries: '',
        castSeriesName: [],
        tags: [],
    });

	useState(()=>{
		setFormData({
			...formData, 
			...editData,
		})}, [editData]);
		
    const handleChangeSelect = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        
        if (name === 'specialsName' || name === 'castMovieName' || name === 'castSeriesName' || name === 'spinoffsName' || name === 'tags') {
            const updatedArray = [...formData[name]];
            if (updatedArray[index] !== value) {
                updatedArray[index] = value;
                setFormData({
                    ...formData,
                    [name]: updatedArray
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleAddSpecial = (name) => {
        setFormData({
            ...formData,
            [name]: [...formData[name], '']
        });
    };

    const handleRemoveSpecial = (name, index) => {
        const updatedSpecials = formData[name].filter((_, i) => i !== index);
        setFormData({
            ...formData,
            [name]: updatedSpecials
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

		console.log("SUBMIT IS CALLED");
        let newFormData = {};
        let toSendProperties = ['title', 'year', 'type', 'rating', 'picture', 'universe', 'universeName', 'tags'];
        toSendProperties.forEach(item => {
            newFormData[item] = formData[item];
        });

        if (formData.type === 'Movie') {
            const movieProperties = ['director', 'prequelMovie', 'prequelMovieName', 'sequelMovie', 'sequelMovieName', 'castMovie', 'castMovieName'];
            movieProperties.forEach(item => {
                newFormData[item] = formData[item];
            });
        } else if (formData.type === 'Series') {
            const seriesProperties = ['showrunner', 'castSeries', 'castSeriesName', 'specials', 'specialsName', 'spinoffs', 'spinoffsName'];
            seriesProperties.forEach(item => {
                newFormData[item] = formData[item];
            });
        } else if (formData.type === 'Book') {
            const bookProperties = ['author', 'prequelBook', 'prequelBookName', 'sequelBook', 'sequelBookName'];
            bookProperties.forEach(item => {
                newFormData[item] = formData[item];
            });
        }
        const reCheckList = ['universe', 'prequelBook', 'sequelBook', 'prequelMovie', 'sequelMovie', 'spinoffs', 'specials', 'castMovie', 'castSeries'];
        reCheckList.forEach(item => {
            if (newFormData[item] === 'No' || newFormData[item] === 'Add Later') {
                newFormData[`${item}Name`] = '';
            }
        });
        
        console.log("CONTROL IS HERE");
			const newForm = new FormData();
			newForm.append('databaseID', currentUser);
			newForm.append('uniqueKey', uniqueKey);
			// Check if newFormData.picture is a valid File object
			if (newFormData.picture !== '' && newFormData.picture instanceof File) {
				newForm.append('picture', newFormData.picture); // selectedFile should be the file selected by the user
			} else {
				console.error("newFormData.picture is not a valid file");
			}
			const jsonFormData = JSON.stringify(newFormData);
			console.log("JSONFORMDATA: ",jsonFormData);
			newForm.append('formData', jsonFormData);
			console.log("NEWFORM: ",newForm);

			try {
				const response = await axios.post('/api/new-entry', newForm, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
			});

		  if (response.status === 200) {
				onSubmit(response.data);
				console.log(response.data);
			console.log('Entry updated successfully.');
		  } else if (response.status === 201) {
				onSubmit(response.data);
				console.log(response.data);
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

    const getSectionStyle = (type) => {
        return formData.type === type ? {} : { opacity: 0.5, pointerEvents: 'none' };
    };

    let inputCardStyle = {
        backgroundColor: theme === 'light' ? light : dark,
        color: theme === 'light' ? dark : lightText,
        borderColor: theme === 'light' ? dark : light,
        boxShadow: `10px 10px 10px 10px ${theme === 'light' ? dark : light}`,
    };
    let sectionContainerStyle = {
        backgroundColor: theme === 'light' ? light : dark,
        color: theme === 'light' ? dark : lightText,
        borderColor: theme === 'light' ? dark : light,
        boxShadow: `5px 5px 5px 0px ${theme === 'light' ? dark : light}`,
    };
    let sectionNameStyle = {
        backgroundColor: theme === 'light' ? light : dark,
        color: theme === 'light' ? dark : lightText,
    };
    let buttonStyle = {
        backgroundColor: theme === 'light' ? light : dark,
        color: theme === 'light' ? dark : lightText,
        borderColor: theme === 'light' ? dark : light,
    };

    return (
        <div className="inputCard" style={inputCardStyle}>
            <form onSubmit={handleSubmit}>
                <div className="section-container" style={sectionContainerStyle}>
                    <div className="section-name" style={sectionNameStyle}>
                        Main Information
                    </div>
                    <FormInput
                        label="Title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required={true}
                    />
                    <FormInput
                        label="Year of Release"
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required={true}
                    />
                    <FormSelect
                        label="Type"
                        name="type"
                        options={['Movie', 'Series', 'Book']}
                        value={formData.type}
                        onChange={handleChange}
                        required={true}
                    />
                    <FormSelect
                        label="Universe"
                        name="universe"
                        options={['No', 'Yes']}
                        value={formData.universe}
                        onChange={handleChangeSelect}
                        required={true}
                    />
                    {formData.universe === 'Yes' && (
                        <FormInput
                            label="Universe Name"
                            type="text"
                            name="universeName"
                            value={formData.universeName}
                            onChange={handleChange}
                            required={true}
                        />
                    )}
                    <FormInput
                        label="Rating"
                        type="number"
                        name="rating"
                        min="0"
                        max="10"
                        step="0.1"
                        value={formData.rating}
                        onChange={handleChange}
                        required={true}
                    />
                    <input 
                        label="Rating"
                        type="range"
                        name="rating"
                        min="0"
                        max="10"
                        step="0.1"
                        value={formData.rating}
                        onChange={handleChange}
                        className="ratingSlider"
                    />
					<FormSpecials
						specialsName={formData.tags}
						name="tags"
						handleChange={handleChange}
						handleAddSpecial={() => handleAddSpecial('tags')}
						handleRemoveSpecial={(name, index) => handleRemoveSpecial(name, index)}
					/>
                    <input
                        label="Picture"
                        type="file"
                        name="picture"
                        onChange={(e) => setFormData({ ...formData, picture: e.target.files[0] })}
                        required={false}
                    />
                    <button onClick={()=>setFormData({ ...formData, picture: '' })} type="button">RemovePicture</button>
                </div>
                <div className="section-container" style={sectionContainerStyle}>
                    <div className="section-name" style={sectionNameStyle}>
                        Book Details
                    </div>
                    <div style={getSectionStyle('Book')}>
                        <FormInput
                            label="Author"
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            required={formData.type === 'Book'}
                        />
                        <FormSelect
                            label="Prequel Book"
                            name="prequelBook"
                            options={['No', 'Yes', 'Add Later']}
                            value={formData.prequelBook}
                            onChange={handleChangeSelect}
                            required={formData.type === 'Book'}
                        />
                        {formData.prequelBook === 'Yes' && (
                            <FormInput
                                label="Prequel Book Name"
                                type="text"
                                name="prequelBookName"
                                value={formData.prequelBookName}
                                onChange={handleChange}
                                required={true}
                            />
                        )}
                        <FormSelect
                            label="Sequel Book"
                            name="sequelBook"
                            options={['No', 'Yes', 'Add Later']}
                            value={formData.sequelBook}
                            onChange={handleChangeSelect}
                            required={formData.type === 'Book'}
                        />
                        {formData.sequelBook === 'Yes' && (
                            <FormInput
                                label="Sequel Book Name"
                                type="text"
                                name="sequelBookName"
                                value={formData.sequelBookName}
                                onChange={handleChange}
                                required={true}
                            />
                        )}
                    </div>
                </div>
                <div className="section-container" style={sectionContainerStyle}>
                    <div className="section-name" style={sectionNameStyle}>
                        Movie Details
                    </div>
                    <div style={getSectionStyle('Movie')}>
                        <FormInput
                            label="Director"
                            type="text"
                            name="director"
                            value={formData.director}
                            onChange={handleChange}
                            required={formData.type === 'Movie'}
                        />
                        <FormSelect
                            label="Prequel Movie"
                            name="prequelMovie"
                            options={['No', 'Yes', 'Add Later']}
                            value={formData.prequelMovie}
                            onChange={handleChangeSelect}
                            required={formData.type === 'Movie'}
                        />
                        {formData.prequelMovie === 'Yes' && (
                            <FormInput
                                label="Prequel Movie Name"
                                type="text"
                                name="prequelMovieName"
                                value={formData.prequelMovieName}
                                onChange={handleChange}
                                required={true}
                            />
                        )}
                        <FormSelect
                            label="Sequel Movie"
                            name="sequelMovie"
                            options={['No', 'Yes', 'Add Later']}
                            value={formData.sequelMovie}
                            onChange={handleChangeSelect}
                            required={formData.type === 'Movie'}
                        />
                        {formData.sequelMovie === 'Yes' && (
                            <FormInput
                                label="Sequel Movie Name"
                                type="text"
                                name="sequelMovieName"
                                value={formData.sequelMovieName}
                                onChange={handleChange}
                                required={true}
                            />
                        )}
                        <FormSelect
                            label="Cast Movie"
                            name="castMovie"
                            options={['No', 'Yes']}
                            value={formData.castMovie}
                            onChange={handleChangeSelect}
                            required={formData.type === 'Movie'}
                        />
                        {formData.castMovie === 'Yes' && (
                            <FormSpecials
                                specialsName={formData.castMovieName}
                                name="castMovieName"
                                handleChange={handleChange}
                                handleAddSpecial={() => handleAddSpecial('castMovieName')}
                                handleRemoveSpecial={(name, index) => handleRemoveSpecial(name, index)}
                                required={true}
                            />
                        )}
                    </div>
                </div>
                <div className="section-container" style={sectionContainerStyle}>
                    <div className="section-name" style={sectionNameStyle}>
                        Series Details
                    </div>
                    <div style={getSectionStyle('Series')}>
                        <FormInput
                            label="Showrunner"
                            type="text"
                            name="showrunner"
                            value={formData.showrunner}
                            onChange={handleChange}
                            required={formData.type === 'Series'}
                        />
                        <FormInput
                            label="Seasons"
                            type="text"
                            name="seasons"
                            value={formData.seasons}
                            onChange={handleChange}
                            required={formData.type === 'Series'}
                        />
                        <FormSelect
                            label="Spinoffs"
                            name="spinoffs"
                            options={['No', 'Yes', 'Add Later']}
                            value={formData.spinoffs}
                            onChange={handleChangeSelect}
                            required={formData.type === 'Series'}
                        />
                        {formData.spinoffs === 'Yes' && (
                            <FormSpecials
                                specialsName={formData.spinoffsName}
                                name="spinoffsName"
                                handleChange={handleChange}
                                handleAddSpecial={() => handleAddSpecial('spinoffsName')}
                                handleRemoveSpecial={(name,index) => handleRemoveSpecial('spinoffsName', index)}
                                required={true}
                            />
                        )}
                        <FormSelect
                            label="Specials"
                            name="specials"
                            options={['No', 'Yes']}
                            value={formData.specials}
                            onChange={handleChangeSelect}
                            required={formData.type === 'Series'}
                        />
                        {formData.specials === 'Yes' && (
                            <FormSpecials
                                specialsName={formData.specialsName}
                                name="specialsName"
                                handleChange={handleChange}
                                handleAddSpecial={() => handleAddSpecial('specialsName')}
                                handleRemoveSpecial={(name,index) => handleRemoveSpecial('specialsName', index)}
                                required={true}
                            />
                        )}
                        <FormSelect
                            label="Cast Series"
                            name="castSeries"
                            options={['No', 'Yes']}
                            value={formData.castSeries}
                            onChange={handleChangeSelect}
                            required={formData.type === 'Series'}
                        />
                        {formData.castSeries === 'Yes' && (
                            <FormSpecials
                                specialsName={formData.castSeriesName}
                                name="castSeriesName"
                                handleChange={handleChange}
                                handleAddSpecial={() => handleAddSpecial('castSeriesName')}
                                handleRemoveSpecial={(name,index) => handleRemoveSpecial('castSeriesName', index)}
                                required={true}
                            />
                        )}
                    </div>
                </div>
            <div className="buttonSection">
                <button className="endButton" style={buttonStyle} type="submit">Submit</button>
                <button className="endButton" style={buttonStyle} type="reset">Reset</button>
                <button className="endButton" style={buttonStyle} onClick={onCancel} type="button">Cancel</button>
				{errorMessage !== "none" && <span>{errorMessage}</span>}
                </div>
            </form>

        </div>
    );
};
