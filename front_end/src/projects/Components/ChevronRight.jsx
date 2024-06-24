import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function ChevronRight ({ onClick }) {
  return (
    <button className="nav-btn" onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  );
};

export default ChevronRight;
