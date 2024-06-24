import React, { useRef, useEffect, useContext } from 'react';
import Button from './Button'; // Import the Button component
	import {ThemeContext} from '../../contexts/ThemeContext.jsx';

const FormSpecials = ({ specialsName, handleChange, handleAddSpecial, handleRemoveSpecial, name }) => {
  const lastInputRef = useRef(null);
    const theme = useContext(ThemeContext);
    const light = '#9beafa';
    const dark = '#11292e';
    const lightText = "#c9f6ff";
    
        const inputStyle = {
		backgroundColor: theme === 'light' ? dark : lightText,
		color: theme === 'light' ? lightText: dark,
		boxShadow: `2px 2px 2px 2px ${theme === 'light' ? lightText : dark}`,
	};
	
		const buttonStyle = {
		backgroundColor: theme === 'light' ? lightText : dark,
		color: theme === 'light' ? dark : lightText,
		borderColor: theme === 'light' ? dark : lightText,
	}
  // Effect to focus on the last input element when specialsName changes
  useEffect(() => {
    if (lastInputRef.current) {
      lastInputRef.current.focus();
    }
  }, [specialsName.length]);

  return (
    <div>
      <label>Special Names:</label>
      {/* Render initial input element */}
      <div className="special-input">
        <input
          type="text"
          name={name}
          value={specialsName[0] || ''}
          onChange={(e) => handleChange(e, 0)}
          style={inputStyle}
          placeholder="Entry 1"
        />
        <button
          type="button"
          style={buttonStyle}
          onClick={specialsName.length < 2 ? () => handleAddSpecial(name) : () => handleRemoveSpecial(name, 0)}
        >
          {specialsName.length < 2 ? '+' : '-'}
        </button>
      </div>

      {/* Map over the rest of the specialsName array */}
      {specialsName.map((special, index) => (
        // Skip rendering if index is 0 (initial input element)
        index !== 0 && (
          <div key={index} className="special-input">
            <input
              type="text"
              name={name}
              value={special}
              onChange={(e) => handleChange(e, index)}
              style={inputStyle}
			  placeholder={`Entry ${index + 1}`} // Correct usage of template literal
              ref={index === specialsName.length - 1 ? lastInputRef : null}
            />
            <button style={buttonStyle} type="button" onClick={() => handleRemoveSpecial(name, index)}>-</button>
            {index === specialsName.length - 1 && (
              <button style={buttonStyle} type="button" onClick={() => handleAddSpecial(name)}>+</button>
            )}
          </div>
        )
      ))}
    </div>
  );
};

export default FormSpecials;
