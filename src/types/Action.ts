import { Person } from './Person';

export type Action =
  | { type: 'SET_PEOPLE'; payload: Person[] }
  | { type: 'SET_FILTERED_PEOPLE'; payload: Person[] | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_FILTERED_ERROR'; payload: string };
