import { Action } from '../types/Action';
import { RootState } from '../types/RootState';

export const reducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case 'get':
      return { ...state, people: action.payload };
    case 'isLoading':
      return { ...state, isLoading: action.payload };
    case 'setSortedAndFiltered':
      return { ...state, sortAndFilterPeople: action.payload };
    default:
      return state;
  }
};
