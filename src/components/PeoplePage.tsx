/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMatch, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const centuries = searchParams.get('centuries');

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

  const showTable = !isLoading
    && isLoaded
    && !errorLoading
    && people.length > 0;

  const visiblePeople = people
    .filter((person) => {
      switch (sex) {
        case 'm':
          return person.sex === 'm';
        case 'f':
          return person.sex === 'f';
        default:
          return person;
      }
    })
    .filter((person) => {
      switch (centuries) {
        case '16':
          return person.born <= 1599;
        case '17':
          return (person.born >= 1600 && person.born <= 1699);
        case '18':
          return (person.born >= 1700 && person.born <= 1799);
        case '19':
          return (person.born >= 1800 && person.born <= 1899);
        case '20':
          return (person.born >= 1900 && person.born <= 1999);
        default:
          return person;
      }
    });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showTable && (
              <PeopleFilters />
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

              <p>There are no people matching the current search criteria</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
