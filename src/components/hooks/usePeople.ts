import { useContext } from 'react';
import { PeopleContext } from '../hoc/PeopleProvider';

export const usePeople = () => {
  return useContext(PeopleContext);
};
