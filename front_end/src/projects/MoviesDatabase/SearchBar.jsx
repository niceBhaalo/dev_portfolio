import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext.jsx';

export default function SearchBar({ onSearchChange, onFilterChange }) {
	
	const theme = useContext(ThemeContext);
  // const light = '#9beafa';
  // const dark = '#11292e';
  // const lightText = "#c9f6ff";
  console.log(theme);
  
  
    const [cardFilters, setCardFilters] = useState({
        Series: 'Yes',
        Book: 'Yes',
        Movie: 'Yes',
        Prequels: 'Yes',
        Sequels: 'Yes',
        SpinOffs: 'Yes',
        Specials: 'Yes',
        Picture: 'Yes',
        Data: 'Yes',
        Type: 'Yes',
        Creators: 'Yes',
        Rating: 'Yes',
        Universe: 'Yes',
        Tags: 'Yes',
        Cast: 'Yes',
    });

    const handleCheckboxChange = (filterKey) => {
        setCardFilters((prevFilters) => ({
            ...prevFilters,
            [filterKey]: prevFilters[filterKey] === 'Yes' ? 'No' : 'Yes',
        }));
    };
    useEffect(()=>{
		onFilterChange(cardFilters);
		},[cardFilters, onFilterChange]);

    const renderCheckboxes = () => {
        return Object.keys(cardFilters).map((key) => (
            <label key={key} style={{ marginRight: '15px' }}>
                <input
                    type="checkbox"
                    checked={cardFilters[key] === 'Yes'}
                    onChange={() => handleCheckboxChange(key)}
                />
                {key}
            </label>
        ));
    };

    return (
        <div>
            <input
                type="text"
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search in Database"
                style={{ display: 'block', marginBottom: '15px' }}
            />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {renderCheckboxes()}
            </div>
        </div>
    );
}
