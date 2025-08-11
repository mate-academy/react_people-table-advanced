/* eslint-disable @typescript-eslint/indent */
import { Person } from '../types';

type ErrorType = 'empty' | 'unloaded' | 'wrongsearch' | null;

export interface ContextDataValues {
  fullList: Person[] | [];
  listToShow: Person[] | [];
  error: ErrorType;
  isLoading: boolean;
}

export interface ContextDataType {
  context: ContextDataValues;
  setContextData: React.Dispatch<React.SetStateAction<ContextDataValues>>;
}
