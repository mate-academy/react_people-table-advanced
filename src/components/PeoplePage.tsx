import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { Person } from '../types';
import { PeopleTable } from './PeopleTable';
import { useLocation, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const location = useLocation();

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || 'all';
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries') || [];
  const sortType = searchParams.get('sort');
  const reversedSearch = searchParams.get('order') || null;

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPeople = people
    .filter(human => {
      switch (sex) {
        case 'm':
          return human.sex === 'm';
        case 'f':
          return human.sex === 'f';
        case 'all':
          return human;
        default:
          return;
      }
    })
    .filter(person => {
      if (query) {
        return (
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.includes(query) ||
          person.motherName?.includes(query)
        );
      }

      return person;
    })
    .filter(human => {
      if (centuries.length > 0) {
        return centuries.includes(Math.ceil(human.born / 100).toString());
      }

      return human;
    })
    .sort((a: Person, b: Person) => {
      switch (sortType) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'sex':
          return a.sex.localeCompare(b.sex);
        case 'born':
          return a.born - b.born;
        case 'died':
          return a.died - b.died;
        default:
          return 0;
      }
    });

  const chooseComponent = () => {
    if (filteredPeople.length === 0 && location.search.length > 0) {
      return <p>There are no people matching the current search criteria</p>;
    }

    return <PeopleTable people={filteredPeople} />;
  };

  if (reversedSearch) {
    filteredPeople.reverse();
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !error && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && !error ? <Loader /> : chooseComponent()}

              {error && !isLoading && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
