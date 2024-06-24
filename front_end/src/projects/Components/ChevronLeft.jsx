import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function ChevronLeft ({ onClick }) {
  return (
    <button className="nav-btn" onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  );
};

export default ChevronLeft;
