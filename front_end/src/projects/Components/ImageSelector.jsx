import React, { useRef } from 'react';

function ImageSelector({ onImageSelect }) {
    const inputRef = useRef(null);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            onImageSelect(files);
        }
        resetInputValue();
    };

    const resetInputValue = () => {
        if (inputRef.current) {
            inputRef.current.value = null; // Reset the value of the file input element
        }
    };

    return (
        <div className="image-selector-container">
            <label htmlFor="imageUpload" className="image-selector-label">
                Select Your Image(s)
            </label>
            <input ref={inputRef} type="file" accept="image/*" id="imageUpload" className="image-selector-input" multiple onChange={handleImageChange} />
        </div>
    );
}

export default ImageSelector;
