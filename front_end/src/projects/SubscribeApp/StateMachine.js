export const states = {
  INITIAL: 'INITIAL',
  SHOW_INPUT: 'SHOW_INPUT',
  SUBSCRIBED: 'SUBSCRIBED',
  SHOW_UNSUB: 'SHOW_UNSUB',
  UNSUBSCRIBED: 'UNSUBSCRIBED',
  BAKA: 'BAKA',
};

export const transitions = {
  [states.INITIAL]: {
    subscribe: states.SHOW_INPUT,
    exit: states.BAKA,
  },
  [states.SHOW_INPUT]: {
    submit: states.SUBSCRIBED,
    exit: states.BAKA,
  },
  [states.SUBSCRIBED]: {
    exit: states.BAKA,
  },
  [states.SHOW_UNSUB]: {
    confirmUnsub: states.UNSUBSCRIBED,
    exit: states.BAKA,
  },
  [states.UNSUBSCRIBED]: {
    resubscribe: states.SHOW_INPUT,
    exit: states.BAKA,
  },
  [states.BAKA]: {
	subbed: states.SHOW_UNSUB,
	unsubbed: states.INITIAL,  
  },
};
