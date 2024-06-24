import React, { useState, useContext} from 'react';
import ImageSelector from '../Components/ImageSelector.jsx';
import ImageCard from '../Components/ImageCard.jsx';
import './ImageMetaDataAppCSS.css';
import {ThemeContext, themes } from '../../contexts/ThemeContext.jsx';

function ImageMetaDataApp() {
				const theme = useContext(ThemeContext);

    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageSelect = (files) => {
        setSelectedImages((prevImages) => [...files, ...prevImages]); // Add new files to the top of the list
    };

    const removeImage = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Remove image at the specified index
    };

    return (
        <div className={`MDParentDiv ${theme}`}>
            <Header />
            <ImageSelector onImageSelect={handleImageSelect} />
            {selectedImages.map((file, index) => (
                <ImageCard key={index} file={file} onRemove={() => removeImage(index)} />
            ))}
        </div>
    );
}

function Header() {
    return (
        <header style={{ textAlign: 'center' }}>
            <h1>Check Your Image's EXIF Metadata</h1>
            <p>Metadata provides valuable information about your image, such as when it was taken, the camera used, and more.</p>
        </header>
    );
}

export default ImageMetaDataApp;
