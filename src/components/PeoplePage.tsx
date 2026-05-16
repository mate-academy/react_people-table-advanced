import { PeopleFilters } from './PeopleFilters';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const noMatchingPeopleMessage =
    'There are no people matching the current search criteria';
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  let visiblePeople = people;
  const normalizedQuery = query?.trim().toLowerCase();

  if (query.trim() !== '') {
    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) ||
        person.fatherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  if (sort) {
    const sortedPeople = [...visiblePeople];

    sortedPeople.sort((person1, person2) => {
      switch (sort) {
        case 'name':

        case 'sex':
          return person1[sort].localeCompare(person2[sort]);

        case 'born':

        case 'died':
          return person1[sort] - person2[sort];

        default:
          return 0;
      }
    });

    if (order === 'desc') {
      sortedPeople.reverse();
    }

    visiblePeople = sortedPeople;
  }

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !errorMessage && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading &&
                !errorMessage &&
                people.length > 0 &&
                visiblePeople.length === 0 && <p>{noMatchingPeopleMessage}</p>}

              {!isLoading && !errorMessage && people.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
