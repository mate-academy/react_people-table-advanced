import { useContext } from 'react';
import { PeopleContext } from '../PeopleProvider/PeopleProvider';

export const usePeople = () => {
  return useContext(PeopleContext);
};
