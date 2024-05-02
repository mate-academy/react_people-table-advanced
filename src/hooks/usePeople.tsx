import React from 'react';
import { PeopleContext, PeopleContextType } from '../context/PeopleContext';

export const usePeople = () =>
  React.useContext<PeopleContextType>(PeopleContext);
