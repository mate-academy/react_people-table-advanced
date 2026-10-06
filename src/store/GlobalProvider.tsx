import React from 'react';
import { Person } from '../types';

type State = {
  people: Person[];
  updatedPeople: Person[];
};

export const initialState: State = {
  people: [],
  updatedPeople: [],
};

type Action =
  | { type: 'loadPeople'; payload: { people: Person[] } }
  | { type: 'updatePeople'; payload: { updatedPeople: Person[] } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'loadPeople':
      return { ...state, people: action.payload.people };
    case 'updatePeople':
      return { ...state, updatedPeople: action.payload.updatedPeople };
  }
};

const StateContext = React.createContext<State>(initialState);
const DispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useDispatch = () => React.useContext(DispatchContext);
export const useGlobalState = () => React.useContext(StateContext);
