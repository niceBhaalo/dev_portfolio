import React, { useEffect } from 'react';
import Masonry from 'masonry-layout';

const MasonryGrid = ({ children, filter, displayData, updateGrid }) => {
  useEffect(() => {
    const grid = document.querySelector('.DisplayCardsContainer');
    new Masonry(grid, {
		itemSelector: '.CardContainer',
		columnWidth: 160,
		containerStyle: null,
		transitionDuration: '0.8s',
		percentPosition: true
    });
  }, [filter, displayData, updateGrid]);


  return <div className="dbGrid">{children}</div>;
};

export default MasonryGrid;
