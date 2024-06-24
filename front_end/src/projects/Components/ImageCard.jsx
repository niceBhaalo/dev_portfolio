import React, { useState, useEffect, useContext } from 'react';
import { formatFileSize } from './UtilityFunctions.jsx';
import EXIF from 'exif-js'; // Import the exif-js library
import {ThemeContext} from '../../contexts/ThemeContext.jsx';

function ImageCard({ file, onRemove }) {
				const theme = useContext(ThemeContext);

    const [fileName, setFileName] = useState('');
    const [filePath, setFilePath] = useState('');
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [lastModifiedDate, setLastModifiedDate] = useState(null);
	const [fileType, setFileType] = useState('');
	const [fileSize, setFileSize] = useState('');
    const [hasExifData, setHasExifData] = useState(false); // New state to track EXIF data presence
    const [exifData, setExifData] = useState(null);

    useEffect(() => {
        if (file) {
            setFileName(file.name);
            setFilePath("Modern Browsers prevent developers from knowing the file's full path");

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    setDimensions({ width: img.width, height: img.height });
                };
            };

            reader.readAsDataURL(file);

            const exifReader = new FileReader();
            exifReader.onload = () => {
				EXIF.getData(file, function() {
					const allMetaData = EXIF.getAllTags(this);
					if (Object.keys(allMetaData).length !== 0) {
						setExifData(allMetaData);
						setHasExifData(true);
					}
				});
            };
            
            exifReader.readAsArrayBuffer(file);

            const date = new Date(file.lastModified);
            setLastModifiedDate(date);
          
            setFileType(file.type);
            setFileSize(formatFileSize(file.size));
        }
    }, [file]);

    return (
        <div className={`image-container ${theme}`}> 
            <img src={URL.createObjectURL(file)} alt="Selected" className="image" />
            <div className="metadata-container">
                <p><strong>File Name:</strong> {fileName}</p>
                <p><strong>File Path:</strong> {filePath}</p>
                <p><strong>Dimensions:</strong> {dimensions.width} x {dimensions.height}</p>
                {lastModifiedDate !== null && (
                    <p><strong>Last Modified Date:</strong> {lastModifiedDate.toLocaleString()}</p>
                )}
				<p><strong>File Type:</strong> {fileType}</p>
				<p><strong>File Size:</strong> {fileSize}</p>
                <p><strong>EXIF Data Found:</strong> {hasExifData ? 'Yes' : 'No'}</p> 
                {exifData && Object.entries(exifData).map(([tag, value]) => (
                    <p key={tag}><strong>{tag}:</strong> {String(value)}</p> 
                ))}
            </div>
            <button onClick={onRemove} className="remove-button">Remove</button>
        </div>
    );
}

export default ImageCard;
