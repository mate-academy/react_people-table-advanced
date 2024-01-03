import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import {
  getFilteredPeople,
  getReversedPeople,
  getSortedPeople,
} from '../utils/peopleHelper';

export const useVisiblePeople = (people: Person[]) => {
  const [searchParams] = useSearchParams();

  const filteredPeople = getFilteredPeople(people, searchParams);
  const sortedPeople = getSortedPeople(filteredPeople, searchParams);
  const reversedPeople = getReversedPeople(sortedPeople, searchParams);

  return reversedPeople;
};
