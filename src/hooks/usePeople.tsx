import { useEffect, useState } from 'react';
import { useFilters } from './useFilters';
import { Person } from '../types';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { getPeople } from '../api';
import { getPeopleWithParents } from '../utils/getPeopleWithParents';

export const usePeople = () => {
  const { sex, query, centuries, sort, order } = useFilters();

  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const sortSettings = { sort, order };
  const filter = { sex, query, centuries };

  const filteredPeople = getFilteredPeople(people, filter, sortSettings);

  const handlePeopleLoad = () => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(getPeopleWithParents)
      .then(setPeople)
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handlePeopleLoad();
  }, []);

  return {
    people,
    error,
    loading,
    sortSettings,
    filter,
    filteredPeople,
    setPeople,
    setError,
    setLoading,
  };
};
