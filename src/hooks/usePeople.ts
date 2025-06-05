import { useLayoutEffect, useMemo, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { getPeopleWithParents } from '../utils/getPeopleWithParents';
import { usePeopleFilter } from './usePeopleFilter';
import { usePeopleSort } from './usePeopleSort';
import { getSortedPeople } from '../utils/getSortedPeople';
import { getFilteredPeople } from '../utils/getFilteredPeople';

export const usePeople = () => {
  const { sex, centuries, name } = usePeopleFilter();
  const { sort, order } = usePeopleSort();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const sortedPeople = useMemo(
    () => getSortedPeople(people, sort, order),
    [people, sort, order],
  );

  const filtredPeople = useMemo(
    () => getFilteredPeople(sortedPeople, sex, name, centuries),
    [sortedPeople, sex, name, centuries],
  );

  useLayoutEffect(() => {
    getPeople()
      .then(data => {
        if (Array.isArray(data)) {
          setPeople(getPeopleWithParents(data));
        } else {
          setError('Fetch people with an error');
        }
      })
      .catch((e: Error) => {
        setError(e.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { people, error, isLoading, filtredPeople };
};
