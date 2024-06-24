import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import Title from "./Title.jsx";
import {ThemeContext, themes } from '../../contexts/ThemeContext.jsx';

function SubmissionCard() {
	
	const theme = useContext(ThemeContext);
	const [submitted, setSubmitted] = useState(true);
	
	const [name, setName] = useState("");
	const [date, setDate] = useState("");
	
	const handleNameChange = (e) => {
		setName(e.target.value);
	};
	const handleDateChange = (e) => {
		setDate(e.target.value);
	};
	  useEffect(() => {
	  			console.log(date);
	  			console.log(name);

		if (name==="" || date==="") {
			setSubmitted(true);
			console.log(date);
		} else {
			setSubmitted(false);
			console.log("There");
		}
	  }, [name, date]); // Watch for changes in name and date props
	const handleSubmit = async () => {
		if (!name.trim() || date === "") {
            alert("Please enter valid name and date of birth.");
            return;
        }
        try {
			console.log({ name, date });
            const response = await axios.post('/api/store-signature', { name, date });
            if (response.status === 201) {
                setSubmitted(true);
            } else {
                throw new Error('Failed to submit data.');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Failed to submit data. Please try again later.');
        }
	};
  return (
    <div className={`EsigCard ${theme}`}>

      <div style={{ marginBottom: '20px' }}>
        <span className="EsigCardTitle" >SUBMISSION CARD</span>
 		<Title classes={"sub-title"} style={{marginTop: '10px'}} text={"Enter a Name and DoB and Press Submit"} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <span className={"bold"}>Your Name:</span>{' '}
		<input type="text" placeholder="Name" value={name} className={"text-box-1"} onChange={handleNameChange}/>

      </div>
      <div className={"container justify-content align-c"} style={{width: '100%'}}>
		<div>
			<span className={"bold"}>Your DOB:</span>{' '}
			<input type="date" placeholder="Date" value={date} className={"text-box-1"} onChange={handleDateChange}/>
        </div>
        <button className={"btn-1"} onClick={handleSubmit} disabled={submitted}>Submit</button>
      </div>
    </div>
  );
}

export default SubmissionCard;
