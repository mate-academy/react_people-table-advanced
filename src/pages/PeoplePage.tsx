import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api/people';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';

import { Person } from '../types/Person';
import { Error } from '../types/Error';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | ''>('');

  const [searchParams] = useSearchParams();
  const sortField = searchParams.get('sort');
  const orderBy = searchParams.get('order');
  const sexFilter = searchParams.get('sex');
  const nameFilter = searchParams.get('name');
  const centuriesFilter = searchParams.getAll('centuries');

  const hasError = useMemo(() => (
    error && !isLoading
  ), [isLoading, error]);

  const hasNoPeople = useMemo(() => (
    !people.length && !isLoading && !error
  ), [people, isLoading, error]);

  const hasPeople = useMemo(() => (
    !!people.length && !isLoading
  ), [people, isLoading]);

  const handleGetPeopleError = useCallback(() => {
    setError(Error.PeopleLoading);
    setTimeout(() => {
      setError('');
    }, 1000);
  }, []);

  const normalizePeople = useCallback((peopleToNormalize: Person[]) => (
    peopleToNormalize.map(person => ({
      ...person,
      mother: peopleToNormalize.find(p => p.name === person.motherName),
      father: peopleToNormalize.find(p => p.name === person.fatherName),
    }))
  ), []);

  const filterPeople = useCallback((peopleToFilter: Person[]) => {
    let filteredPeople = [...peopleToFilter];

    if (sexFilter) {
      filteredPeople = filteredPeople.filter(
        person => person.sex === sexFilter,
      );
    }

    if (nameFilter) {
      filteredPeople = filteredPeople.filter(person => (
        person.name.toLowerCase().includes(nameFilter.toLowerCase())
          || person.fatherName?.toLowerCase().includes(nameFilter.toLowerCase())
          || person.motherName?.toLowerCase().includes(nameFilter.toLowerCase())
      ));
    }

    if (centuriesFilter.length) {
      filteredPeople = filteredPeople.filter(person => (
        centuriesFilter.includes(Math.ceil(person.born / 100).toString())
      ));
    }

    return filteredPeople;
  }, [sexFilter, nameFilter, centuriesFilter]);

  const sortPeople = useCallback((peopleToSort: Person[]) => (
    peopleToSort.sort((personA, personB) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return personA[sortField].localeCompare(personB[sortField]);

        case 'born':
        case 'died':
          return personA[sortField] - personB[sortField];

        default:
          return 0;
      }
    })
  ), [sortField]);

  const isReversed = useMemo(() => orderBy === 'desc', [orderBy]);

  const setPreparedPeople = useCallback((peopleToPrepare: Person[]) => {
    const normalizedPeople = normalizePeople(peopleToPrepare);
    const filteredPeople = filterPeople(normalizedPeople);
    const sortedPeople = sortPeople(filteredPeople);

    if (isReversed) {
      sortedPeople.reverse();
    }

    return sortedPeople;
  }, [normalizePeople, filterPeople, sortPeople, isReversed]);

  const preparedPeople = useMemo(() => (
    setPreparedPeople(people)
  ), [setPreparedPeople, people]);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(handleGetPeopleError)
      .finally(() => setIsLoading(false));
  }, [setPreparedPeople, handleGetPeopleError]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {hasError && (
                <p data-cy="peopleLoadingError">
                  {error}
                </p>
              )}

              {hasNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasNoPeople && false && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hasPeople && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
