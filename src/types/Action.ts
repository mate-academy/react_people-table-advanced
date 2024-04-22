import { Person } from './Person';

export type Action =
  | { type: 'getPeople'; data: Person[] }
  | { type: 'setError' }
  | { type: 'setIsLoading'; value: boolean }
  | { type: 'setCenturies'; payload: string[] };
