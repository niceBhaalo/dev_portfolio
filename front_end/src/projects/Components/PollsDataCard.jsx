import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import {ThemeContext, themes } from '../../contexts/ThemeContext.jsx';

const PollsDataCard = ({ pollData, pollType }) => {
			const theme = useContext(ThemeContext);

  const [selectedOption, setSelectedOption] = useState(null);
  const [pollResult, setPollResult] = useState(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const fetchResultsRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (localStorage.getItem(pollData._id) === 'true') {
        try {
          const response = await axios.post(`/api/get-poll-results`, { pollId: pollData._id });
          setPollResult(response.data);
          setTotalVotes(calculateTotalVotes(response.data));
        } catch (error) {
          console.error('Error fetching poll results:', error);
        }
      } 
    };

    // Initialize fetchResultsRef.current only if it's not already set
    if (!fetchResultsRef.current) {
      fetchResultsRef.current = fetchResults;
      fetchResultsRef.current(); // Call fetchResults function the first time
    }
  }, [pollData, pollType]);

  const handleOptionClick = (option) => {
    if (!pollResult) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = async () => {
    if (!selectedOption) return;
    try {
      const response = await axios.post('/api/submit-poll', { pollId: pollData._id, selectedOption });
      setPollResult(response.data);
      setTotalVotes(calculateTotalVotes(response.data));
      localStorage.setItem(pollData._id, 'true');
    } catch (error) {
      console.error('Poll Submission Unsuccessful:', error);
    }
  };

  const calculateTotalVotes = (result) => {
    return Object.values(result).reduce((sum, votes) => sum + parseInt(votes), 0);
  };

  const calculatePercentage = (optionVotes) => {
    if (totalVotes === 0) return '0.00%';
    return ((parseInt(optionVotes) / totalVotes) * 100).toFixed(2) + '%';
  };

  return (
    <div className={`poll-container ${theme}`}>
      <h2>{pollData.text}</h2>
      <div className="options-container">
        {pollData.options.map((option, index) => (
          <div key={index} className={`option-container ${selectedOption === option ? 'selected' : ''}`} onClick={() => handleOptionClick(option)}>
            <div className="option-text">{option}</div>
            {pollResult && (
              <div className="poll-result">{calculatePercentage(pollResult[option.toLowerCase()])}</div>
            )}
            {pollType === 'Open' && selectedOption === option && !pollResult && (
              <button className="submit-button" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollsDataCard;
