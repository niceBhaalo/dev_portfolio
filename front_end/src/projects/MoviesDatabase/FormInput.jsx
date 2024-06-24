import React, {useContext} from 'react';
import Button from './Button'; // Import the Button component
import {ThemeContext} from '../../contexts/ThemeContext.jsx';

const FormInput = ({ label, type, name, value, onChange, required }) => {
	
    const theme = useContext(ThemeContext);
    const light = '#9beafa';
    const dark = '#11292e';
    const lightText = "#c9f6ff";
    
    const inputStyle = {
		backgroundColor: theme === 'light' ? dark : lightText,
		color: theme === 'light' ? lightText: dark,
		boxShadow: `2px 2px 2px 2px ${theme === 'light' ? lightText : dark}`,
	};

	const labelStyle = {
		color: theme === 'light' ? dark: lightText,
	};

  return (
    <div className="form-group">
      <label htmlFor={name} style={labelStyle}>{label}:&nbsp;</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        required={required}
        style={inputStyle}
      />
    </div>
  );
};

export default FormInput;
