import React, { useReducer } from 'react';
import { Person } from './types/Person';

export enum Actions {
  getPeople = 'getPeople',
  setErrorMessage = 'setErrorMessage',
  setIsLoading = 'setIsLoading',
  setQueryResult = 'setQueryResult',
}

type Action =
  | { type: Actions.getPeople; people: Person[] }
  | { type: Actions.setErrorMessage; errorMessage: string }
  | { type: Actions.setIsLoading; status: boolean }
  | { type: Actions.setQueryResult; status: boolean };

interface State {
  people: Person[];
  errorMessage: string;
  isLoading: boolean;
  isQueryCriteria: boolean;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case Actions.getPeople:
      return {
        ...state,
        people: action.people,
      };
    case Actions.setErrorMessage:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    case Actions.setIsLoading:
      return {
        ...state,
        isLoading: action.status,
      };
    case Actions.setQueryResult:
      return {
        ...state,
        isLoading: action.status,
      };
    default:
      return state;
  }
}

const initialState: State = {
  people: [],
  errorMessage: '',
  isLoading: false,
  isQueryCriteria: false,
};

export const StateContext = React.createContext(initialState);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [{ people, errorMessage, isLoading, isQueryCriteria }, dispatch] =
    useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider
        value={{ people, errorMessage, isLoading, isQueryCriteria }}
      >
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
