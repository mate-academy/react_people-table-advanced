import React, { useEffect, useReducer, createContext } from 'react';
import { getPeople } from './api';
import { Person } from './types';
import { State } from './types/State';
import { Action } from './types/Action';

const initialState = {
  people: [],
  hasError: false,
  isLoading: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'getPeople':
      return {
        ...state,
        people: action.data,
      };

    case 'setError':
      return {
        ...state,
        hasError: true,
      };

    case 'setIsLoading':
      return {
        ...state,
        isLoading: action.value,
      };

    default:
      return state;
  }
}

export const StateContext = createContext<State>(initialState);
export const DispatchContext = createContext<(action: Action) => void>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'setIsLoading', value: true });
    getPeople()
      .then((data: Person[]) => dispatch({ type: 'getPeople', data }))
      .catch(() => dispatch({ type: 'setError' }))
      .finally(() => dispatch({ type: 'setIsLoading', value: false }));
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
