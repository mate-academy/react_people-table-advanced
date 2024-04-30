import React from 'react';
import { State } from '../types/State';
import { Action } from '../types/Action';

const initialState: State = {
  people: [],
  filteredPeople: null,
  filteredError: '',
  error: '',
  loading: false,
};

const PeopleStateContext = React.createContext(initialState);
// eslint-disable-next-line
const PeopleDispatchContext = React.createContext((_: Action) => {});

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'SET_PEOPLE':
      return {
        ...state,
        people: payload,
      };

    case 'SET_FILTERED_PEOPLE':
      return {
        ...state,
        filteredPeople: payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case 'SET_FILTERED_ERROR':
      return {
        ...state,
        filteredError: payload,
      };

    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};

export const PeopleProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <PeopleStateContext.Provider value={state}>
      <PeopleDispatchContext.Provider value={dispatch}>
        {children}
      </PeopleDispatchContext.Provider>
    </PeopleStateContext.Provider>
  );
};

export const usePeopleState = () => React.useContext(PeopleStateContext);
export const usePeopleDispatch = () => React.useContext(PeopleDispatchContext);
