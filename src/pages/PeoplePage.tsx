import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useLocation, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorInMatchingQuery, setIsErrorInMatchingQuery] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  const { search } = useLocation();

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = useMemo(
    () => searchParams.getAll('century') || [],
    [searchParams],
  );

  const filterPeople = useCallback(() => {
    setIsErrorInMatchingQuery(false);

    let result = [...people];

    // filtering by sex
    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    // filtering by century
    if (centuries.length > 0) {
      result = result.filter(person => {
        const century = Math.ceil(person.born / 100);

        return centuries.includes(century.toString());
      });
    }

    // filtering by query
    if (query) {
      result = result.filter(person => {
        return (
          person.name.includes(query) ||
          person.fatherName?.includes(query) ||
          person.motherName?.includes(query)
        );
      });
    }

    result.length === 0 && setIsErrorInMatchingQuery(true);

    setFilteredPeople(result);
  }, [people, sex, centuries, query]);

  useEffect(() => {
    filterPeople();
  }, [people, sex, centuries, query]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(gotPeople => {
        setPeople(gotPeople);
        setFilteredPeople(gotPeople);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <p className="title is-6">{search && search.replaceAll('&', ' &')}</p>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && !isLoading && <PeopleFilters />}
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {people.length === 0 && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {isErrorInMatchingQuery ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
