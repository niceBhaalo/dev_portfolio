import React, { useEffect, useContext } from 'react';
	import {ThemeContext} from '../../contexts/ThemeContext.jsx';


const FormSelect = ({ label, name, options, value, onChange }) => {
	
    const theme = useContext(ThemeContext);
    const light = '#9beafa';
    const dark = '#11292e';
    const lightText = "#c9f6ff";

    const selectStyle = {
		backgroundColor: theme === 'light' ? dark : lightText,
		color: theme === 'light' ? lightText: dark,
		boxShadow: `2px 2px 2px 2px ${theme === 'light' ? lightText : dark}`,
	};
  useEffect(() => {
    if (!value && options.length > 0) {
      onChange({ target: { name, value: options[0] } });
    }
  }, [value, options, onChange, name]);

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:&nbsp;</label>
      <select
        id={name}
        name={name}
        value={value || options[0]}
        onChange={onChange}
        style={selectStyle}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
