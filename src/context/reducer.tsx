/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useReducer } from 'react';
import { Person } from '../types';
import { SwithchError } from '../types/SwitchError';

type Action =
  | { type: 'setPeople'; payload: Person[] }
  | { type: 'setFetch' }
  | { type: 'disableFetch' }
  | { type: 'setSwitchError'; message: SwithchError }
  | { type: 'setCenturies'; payload: string[] };

interface State {
  people: Person[];
  isLoading: boolean;
  message: SwithchError;
  centuries: string[];
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'setPeople':
      return {
        ...state,
        people: action.payload,
      };

    case 'setFetch':
      return {
        ...state,
        isLoading: true,
      };

    case 'disableFetch':
      return {
        ...state,
        isLoading: false,
      };

    case 'setSwitchError':
      return {
        ...state,
        message: action.message,
      };

    case 'setCenturies':
      return {
        ...state,
        centuries: action.payload,
      };
  }
};

const initialState: State = {
  people: [],
  isLoading: false,
  message: SwithchError.Default,
  centuries: [],
};

export const StateContex = React.createContext(initialState);
export const DispatchContext = React.createContext((_action: Action) => {});

interface Props {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContex.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContex.Provider>
  );
};
