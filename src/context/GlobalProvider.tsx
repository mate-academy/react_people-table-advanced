import React from 'react';
import { RootState } from '../types/RootState';
import { Action } from '../types/Action';
import { reducer } from './Reduser';

const initialState: RootState = {
  people: [],
  isLoading: true,
  sortAndFilterPeople: [],
};

export const StateContext = React.createContext<RootState>(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
