import { useEffect, useMemo, useState } from 'react';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsPeopleLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsPeopleLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    let preparedPeople = people.map(person => {
      const foundFather =
        people.find(fath => person.fatherName === fath.name) || null;
      const foundMother =
        people.find(moth => person.motherName === moth.name) || null;

      return {
        ...person,
        father: foundFather,
        mother: foundMother,
      };
    });

    // #region filter and sort

    const sexFilter = searchParams.get('sex');
    const centuries = searchParams.getAll('centuries');
    const query = searchParams.get('query');
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (sexFilter) {
      preparedPeople = preparedPeople.filter(({ sex }) => sex === sexFilter);
    }

    if (centuries.length) {
      preparedPeople = preparedPeople.filter(({ born }) =>
        centuries.includes(Math.ceil(born / 100).toString()),
      );
    }

    if (query) {
      const normalizedQuery = query.trim().toLowerCase();

      preparedPeople = preparedPeople.filter(
        ({ name, fatherName, motherName }) =>
          name.toLowerCase().includes(normalizedQuery) ||
          fatherName?.toLowerCase().includes(normalizedQuery) ||
          motherName?.toLowerCase().includes(normalizedQuery),
      );
    }

    if (currentSort) {
      const multiplier = currentOrder === 'desc' ? -1 : 1;

      preparedPeople = [...preparedPeople].sort((person1, person2) => {
        switch (currentSort) {
          case 'name':
          case 'sex':
            return (
              person1[currentSort].localeCompare(person2[currentSort]) *
              multiplier
            );

          case 'born':
          case 'died':
            return (person1[currentSort] - person2[currentSort]) * multiplier;

          default:
            return 0;
        }
      });

      return preparedPeople;
    }

    return preparedPeople;
    // #endregion
  }, [people, searchParams]);

  const isError = !isPeopleLoading && hasError;
  const isLoadedPeople = !isPeopleLoading && !!people.length;
  const isNoPeopleOnServer = !isPeopleLoading && !people.length && !isError;
  const isNoMatches = !isError && !visiblePeople.length && !isPeopleLoading;

  return {
    visiblePeople,
    isError,
    isNoPeopleOnServer,
    isLoadedPeople,
    isPeopleLoading,
    isNoMatches,
  };
};
