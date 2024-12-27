import React, { useReducer } from 'react';
import { RootState } from '../types/RootState';
import { Action } from '../types/Action';

export const initialState: RootState = {
  people: [],
  searchResultCount: 0,
};

export const StateContext = React.createContext<RootState>(initialState);

export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const reducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case 'setPeople':
      return {
        ...state,
        people: action.payload,
        searchResultCount: action.payload.length,
      };

    case 'setSearchResultCount':
      return {
        ...state,
        searchResultCount: action.payload,
      };

    default:
      return state;
  }
};

interface Props {
  children: React.ReactNode;
}

export const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
