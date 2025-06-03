import { createContext, useReducer } from 'react';
import { Person } from '../types';
import { States } from '../types/States';

type DispatchContextType = {
  (action: Action): void;
};

type Action =
  | { type: 'isReady'; payload: boolean }
  | { type: 'loadPeople'; payload: Person[] }
  | { type: 'setLoadingErrorMsg'; payload: boolean }
  | { type: 'setNoPeopleMsg'; payload: boolean }
  | { type: 'setNoMatchMsg'; payload: boolean };

const initialStates: States = {
  people: [],
  isReady: false,
  hasLoadingErrorMsg: false,
  hasNoPeopleMsg: false,
  hasNoMatchMsg: false,
};

function reducer(states: States, action: Action) {
  let newStates: States = { ...states };

  switch (action.type) {
    case 'isReady':
      newStates = { ...newStates, isReady: action.payload };
      break;
    case 'loadPeople':
      newStates = { ...newStates, people: action.payload };
      break;
    case 'setLoadingErrorMsg':
      newStates = { ...newStates, hasLoadingErrorMsg: action.payload };
      break;
    case 'setNoPeopleMsg':
      newStates = { ...newStates, hasNoPeopleMsg: action.payload };
      break;
    case 'setNoMatchMsg':
      newStates = { ...newStates, hasNoMatchMsg: action.payload };
      break;
    default:
      return states;
  }

  return newStates;
}

export const StatesContext = createContext(initialStates);
export const DispatchContext = createContext<DispatchContextType>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [states, dispatch] = useReducer(reducer, initialStates);

  return (
    <StatesContext.Provider value={states}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StatesContext.Provider>
  );
};
