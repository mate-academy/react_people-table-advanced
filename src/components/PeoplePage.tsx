/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMatch, useSearchParams } from 'react-router-dom';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import debounce from 'lodash.debounce';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { Errors, getPeople } from '../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorLoading, setErrorLoading] = useState('');
  const match = useMatch('/people/:personSlug');
  const personSlugSelected = match?.params.personSlug;
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((peopleData) => {
        setPeople(peopleData);
        setIsLoaded(true);
      })
      .catch(() => {
        setErrorLoading(Errors.LOADING);
        setIsLoaded(false);
      })
      .finally(() => (
        setIsLoading(false)
      ));
  }, []);

  useEffect(() => {
    debounce(() => {
      if (debouncedQuery) {
        searchParams.set('query', debouncedQuery);
      } else {
        searchParams.delete('query');
      }

      setSearchParams(searchParams);
    }, 1000);
  }, [debouncedQuery]);

  const applyQuery = useCallback(
    debounce(setDebouncedQuery, 1000),
    [debouncedQuery],
  );

  const queryHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const showTable = !isLoading
    && isLoaded
    && !errorLoading
    && people.length > 0;

  const baseCenturies: number[] = useMemo(
    () => people.reduce((centuries: number[], person) => {
      const century = Math.ceil(person.born / 100);

      if (!centuries.includes(century)) {
        centuries.push(century);
      }

      return centuries.sort();
    }, []),
    [people],
  );

  const centuries = searchParams
    .getAll('centuries') || baseCenturies;

  const peopleByCentury = useMemo(() => (
    centuries.length
      ? people.filter((person) => (
        centuries.includes(Math.ceil(person.born / 100).toString())))
      : people
  ), [centuries, people]);

  const peopleByGender = useMemo(() => (
    sex
      ? peopleByCentury.filter((person) => {
        switch (sex) {
          case 'm':
            return person.sex === 'm';
          case 'f':
            return person.sex === 'f';
          default:
            return person;
        }
      })
      : peopleByCentury
  ), [sex, peopleByCentury]);

  const visiblePeople = useMemo(() => (
    debouncedQuery
      ? peopleByGender.filter((person) => {
        const input = debouncedQuery.toLocaleLowerCase().trim();

        const name = person.name.toLocaleLowerCase();
        const mothersName = person.motherName?.toLocaleLowerCase();
        const fathersName = person.fatherName?.toLocaleLowerCase();

        return name.includes(input)
          || mothersName?.includes(input) || fathersName?.includes(input);
      })
      : peopleByGender
  ), [debouncedQuery, peopleByGender]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showTable && (
              <PeopleFilters
                queryHandler={queryHandler}
                query={query}
                baseCenturies={baseCenturies}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {errorLoading && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  {errorLoading}
                </p>
              )}
              {isLoading && (<Loader />)}
              {isLoaded && people.length === 0
                && (
                  <p
                    data-cy="noPeopleMessage"
                  >
                    {Errors.EMPTY}
                  </p>
                )}
              {showTable && (
                <PeopleTable
                  people={visiblePeople}
                  personSlugSelected={personSlugSelected}
                />
              )}
              {!visiblePeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
