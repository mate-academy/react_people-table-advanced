import React, { useCallback, useReducer } from 'react';
import { Person } from '../types';
import * as apiService from '../api';

interface Props {
  children: React.ReactNode;
}

interface State {
  people: Person[];
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
}

interface Actions {
  getPeople: () => Promise<void>;
}

type PeopleContextType = State & Actions;

type Action =
  | { type: 'getPeople'; getPayback: Person[] }
  | { type: 'isLoading'; loadingPayback: boolean }
  | { type: 'isError'; errorPayback: boolean }
  | { type: 'isEmpty'; emptyPayback: boolean };

export const PeopleState = React.createContext<PeopleContextType>({
  people: [],
  isLoading: false,
  isError: false,
  isEmpty: false,
  getPeople: async () => {},
});

export const PeopleDispatch = React.createContext<React.Dispatch<Action>>(
  () => {},
);

const initialState: State = {
  people: [],
  isLoading: false,
  isError: false,
  isEmpty: false,
};

function peopleReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'getPeople':
      return {
        ...state,
        people: action.getPayback,
      };
    case 'isLoading':
      return {
        ...state,
        isLoading: action.loadingPayback,
      };
    case 'isError':
      return {
        ...state,
        isError: action.errorPayback,
      };
    case 'isEmpty':
      return {
        ...state,
        isEmpty: action.emptyPayback,
      };
    default:
      return state;
  }
}

export const PeopleContext: React.FC<Props> = ({ children }) => {
  const [people, dispatch] = useReducer(peopleReducer, initialState);

  const getPeople = useCallback(async () => {
    dispatch({ type: 'isLoading', loadingPayback: true });
    try {
      const peopleData = await apiService.getPeople();

      if (peopleData.length === 0) {
        dispatch({ type: 'isEmpty', emptyPayback: true });
      } else {
        dispatch({ type: 'isEmpty', emptyPayback: false });
      }

      dispatch({ type: 'getPeople', getPayback: peopleData });
    } catch {
      dispatch({ type: 'isError', errorPayback: true });
    } finally {
      dispatch({ type: 'isLoading', loadingPayback: false });
    }
  }, []);

  return (
    <PeopleDispatch.Provider value={dispatch}>
      <PeopleState.Provider value={{ ...people, getPeople }}>
        {children}
      </PeopleState.Provider>
    </PeopleDispatch.Provider>
  );
};
