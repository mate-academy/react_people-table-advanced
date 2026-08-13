import { Person } from '../types';

type PeopleAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Person[] }
  | { type: 'FETCH_ERROR' };

export interface PeopleState {
  people: Person[];
  isLoading: boolean;
  hasError: boolean;
}

export const peopleInitialState: PeopleState = {
  people: [],
  isLoading: true,
  hasError: false,
};

export const peopleReducer = (state: PeopleState, action: PeopleAction) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, hasError: false };

    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, people: action.payload };

    case 'FETCH_ERROR':
      return { ...state, isLoading: false, hasError: true };

    default:
      return state;
  }
};
