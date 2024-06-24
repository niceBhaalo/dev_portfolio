import { useState } from 'react';
import { transitions } from './StateMachine';

const useStateMachine = (initialState) => {
  const [state, setState] = useState(initialState);

  const transition = (action) => {
    const nextState = transitions[state]?.[action];
    if (nextState) {
      setState(nextState);
    }
  };

  return [state, transition];
};

export default useStateMachine;
