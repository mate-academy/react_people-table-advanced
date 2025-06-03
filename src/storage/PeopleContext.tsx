import React, { createContext } from 'react';
import { State } from '../types/State';
import { Action } from '../types/Action';

type PeopleContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const PeopleContext = createContext<PeopleContextType | null>(null);
