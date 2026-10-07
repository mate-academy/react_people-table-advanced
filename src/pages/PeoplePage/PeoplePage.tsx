import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PeopleTable } from '../../components/PeopleTable';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters';

import { getPeople } from '../../api';

import type { Person } from '../../types';

const getVisiblePeople = (searchParams: URLSearchParams, people: Person[]) => {
  let visiblePeople = [...people];

  const sex = searchParams.get('sex');

  switch (sex) {
    case 'm':
      visiblePeople = visiblePeople.filter(person => {
        return person.sex === 'm';
      });
      break;
    case 'f':
      visiblePeople = visiblePeople.filter(person => {
        return person.sex === 'f';
      });
      break;
    default:
      break;
  }

  const query = searchParams.get('query');

  if (query) {
    const normalizedQuery = query.toLowerCase();

    visiblePeople = visiblePeople.filter(person => {
      return (
        person.name.toLowerCase().includes(normalizedQuery) ||
        person.motherName?.toLowerCase().includes(normalizedQuery) === true ||
        person.fatherName?.toLowerCase().includes(normalizedQuery) === true
      );
    });
  }

  const centuries = searchParams.getAll('centuries');

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  switch (sortBy) {
    case 'name':
      visiblePeople.sort((person1, person2) =>
        person1.name.localeCompare(person2.name),
      );
      break;

    case 'sex':
      visiblePeople.sort((person1, person2) =>
        person1.sex.localeCompare(person2.sex),
      );
      break;

    case 'born':
      visiblePeople.sort((person1, person2) => person1.born - person2.born);
      break;

    case 'died':
      visiblePeople.sort((person1, person2) => person1.died - person2.died);
      break;

    default:
      break;
  }

  if (sortOrder) {
    visiblePeople.reverse();
  }

  return visiblePeople;
};

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(
    () => getVisiblePeople(searchParams, people),
    [searchParams, people],
  );

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
              {errorMessage ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              ) : isLoading ? (
                <Loader />
              ) : people.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : visiblePeople.length === 0 ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
