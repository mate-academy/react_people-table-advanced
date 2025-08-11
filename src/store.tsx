import { Person } from './types';
import React, { useReducer } from 'react';

type Action =
  | { type: 'loadStart' }
  | { type: 'loadSuccess'; payload: Person[] }
  | { type: 'error'; payload: string };

interface State {
  people: Person[];
  loading: boolean;
  error: string | null;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'loadStart':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'loadSuccess':
      return {
        ...state,
        loading: false,
        people: action.payload,
      };
    case 'error':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

const initialState: State = {
  people: [],
  loading: false,
  error: null,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
