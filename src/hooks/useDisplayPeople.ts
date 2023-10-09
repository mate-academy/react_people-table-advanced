import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { Person } from '../types';

export const useDisplayPeople = (people: Person[]) => {
  const [seatchParams] = useSearchParams();

  const displayPeople = useMemo(() => {
    const queryFilter = seatchParams.get('query')?.toLocaleLowerCase();
    const sexFilter = seatchParams.get('sex') || '';

    return people.filter(person => {
      if (queryFilter && !person.name
        .toLocaleLowerCase()
        .includes(queryFilter)
      ) {
        return false;
      }

      if (sexFilter && person.sex !== sexFilter) {
        return false;
      }

      return true;
    });
  }, [people, seatchParams]);

  return displayPeople;
};
