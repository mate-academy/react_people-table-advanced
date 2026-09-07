import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types/Person';

import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

type SortField = 'name' | 'sex' | 'born' | 'died';

const sortFields: SortField[] = ['name', 'sex', 'born', 'died'];

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const sortParam = searchParams.get('sort');
  const order = searchParams.get('order');

  const sort: SortField | null =
    sortParam && sortFields.includes(sortParam as SortField)
      ? (sortParam as SortField)
      : null;

  let visiblePeople = [...people];

  if (query) {
    const normalizedQuery = query.toLowerCase();

    visiblePeople = visiblePeople.filter(person => {
      const name = person.name.toLowerCase();
      const motherName = person.motherName?.toLowerCase() || '';
      const fatherName = person.fatherName?.toLowerCase() || '';

      return (
        name.includes(normalizedQuery) ||
        motherName.includes(normalizedQuery) ||
        fatherName.includes(normalizedQuery)
      );
    });
  }

  if (sex === 'm' || sex === 'f') {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  if (sort) {
    visiblePeople.sort((person1, person2) => {
      let result = 0;

      if (sort === 'name' || sort === 'sex') {
        result = person1[sort].localeCompare(person2[sort]);
      } else {
        result = person1[sort] - person2[sort];
      }

      return order === 'desc' ? -result : result;
    });
  }

  const peopleAreLoaded = !isLoading && !hasError && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleAreLoaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError"> Something went wrong </p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {peopleAreLoaded && visiblePeople.length === 0 && (
                <p> There are no people matching the current search criteria</p>
              )}

              {peopleAreLoaded && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} allPeople={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
