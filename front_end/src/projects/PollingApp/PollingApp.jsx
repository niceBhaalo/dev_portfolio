import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import PollsDataWindow from "../Components/PollsDataWindow.jsx";
import './PollingAppCSS.css';
import {ThemeContext} from '../../contexts/ThemeContext.jsx';


export default function PollingApp() {
		const theme = useContext(ThemeContext);
	console.log(theme);
  const [selectedTab, setSelectedTab] = useState(0);
  const [pollData, setPollData] = useState(null);
  const tabColors = ['#8296B0', '#71A9C2', '#98D3C7']; // Define tabColors here
  const [data, setData] = useState([]);

  const handleTabClick = (tabIndex) => {
    setSelectedTab(tabIndex);
  };

  useEffect(() => {
    const fetchPollsData = async () => {
      try {
        const response = await axios.post('/api/get-polls');
        setPollData(response.data);
      } catch (error) {
        console.error('Error fetching polls data:', error);
      }
    };
    fetchPollsData();
  }, []); // Empty dependency array ensures the effect runs only once

  const memoizedPollData = useMemo(() => pollData, [pollData]); // Memoize pollData

  useEffect(() => {
    if (memoizedPollData) {
      switch (selectedTab) {
        case 0:
          setData(memoizedPollData.filter(poll => localStorage.getItem(poll._id) !== 'true'));
          break;
        case 1:
          setData(memoizedPollData.filter(poll => localStorage.getItem(poll._id) === 'true'));
          break;
        default:
          setData([]);
          break;
      }
      console.log(memoizedPollData);
    }
  }, [selectedTab, memoizedPollData]);

  return (
    <div className={`PollingParentDiv ${theme}`}>
		<div className={"PollingWindow"}>
        <div className="container justify-center">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="container file-tab justify-center align-c fs-3"
              style={{ backgroundColor: tabColors[index] }}
              onClick={() => handleTabClick(index)}
            >
              {index === 0 ? 'Open' : index === 1 ? 'Answered' : 'Upcoming'}
            </div>
          ))}
        </div>
        <div className="poll-list-window" style={{ backgroundColor: tabColors[selectedTab] }}>
			<PollsDataWindow key={1} data={data} pollType={selectedTab === 0 ? 'Open' : 'Answered'} />
        </div>
        </div>
    </div>
  );
}
