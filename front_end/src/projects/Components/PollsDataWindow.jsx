import React, { useState, useEffect, useMemo } from 'react';
import PollsDataCard from './PollsDataCard'; // Import the Poll component

export default function PollsDataWindow({ data, pollType }) {
  const [activeTab, setActiveTab] = useState(null);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [allPollsInCategories, setAllPollsInCategories] = useState({});
  const [selectedPolls, setSelectedPolls] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const categories = data.map(item => item.category);
      const uniqueCategories = [...new Set(categories)];
      setUniqueCategories(uniqueCategories);
      setActiveTab(uniqueCategories[0]);

      // Calculate all pollsInCategory for all categories
      const allPolls = {};
      uniqueCategories.forEach(category => {
        const pollsInCategory = data.filter(item => item.category === category);
        allPolls[category] = pollsInCategory;
      });
      setAllPollsInCategories(allPolls);
      setSelectedPolls(allPolls[uniqueCategories[0]]);
    } else {
      setUniqueCategories([]);
      setAllPollsInCategories({});
      setSelectedPolls([]);
      setActiveTab(null);
    }
  }, [data]); // Add data to the dependency array

  // Memoize selectedPolls to prevent unnecessary re-renders
  const memoizedSelectedPolls = useMemo(() => selectedPolls, [selectedPolls]);

  const handleTabClick = (category) => {
    setActiveTab(category);
    setSelectedPolls(allPollsInCategories[category] || []);
  };

  return (
    <div>
      <div className="container align-c flex-row">
        {uniqueCategories.map(category => (
          <div
            key={category}
            className={`file-tab-small container justify-center align-c ${category === activeTab ? 'active-file-tab' : ''}`}
            onClick={() => handleTabClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div>
        {/* Render PollsDataCard components only when selectedPolls changes */}
        {memoizedSelectedPolls.map((poll) => (
          <div style={{ justifyContent: 'center', display: 'flex' }} key={poll._id}>
            <PollsDataCard key={poll._id} pollData={poll} pollType={pollType}/>
          </div>
        ))}
      </div>
    </div>
  );
}
