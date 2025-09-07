/* eslint-disable @typescript-eslint/no-shadow */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((people: Person[]) => {
        setPeople(people);
      })
      .catch(error => {
        setIsError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = people.filter(person => {
    const personCentury = Math.ceil(person.born / 100);

    return (
      (query
        ? person.name.toLowerCase().includes(query) ||
          person.motherName?.toLowerCase().includes(query) ||
          person.fatherName?.toLowerCase().includes(query)
        : true) &&
      (sex ? person.sex === sex : true) &&
      (centuries.length > 0
        ? centuries.includes(personCentury.toString())
        : true)
    );
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            {!isLoading && !isError && people.length > 0 && (
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
            )}

            <div className="column">
              <div className="box table-container">
                {!isLoading && isError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {!isLoading && !isError && people.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {!isLoading && !isError && people.length > 0 && (
                  <PeopleTable people={visiblePeople} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
