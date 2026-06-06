import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types';

import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

function getVisiblePeople(
  people: Person[],
  query: string,
  centuries: string[],
  sort: string,
  order: string,
  sex: string,
): Person[] {
  let visiblePeople = [...people];

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
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
    visiblePeople.sort((person1, person2) => {
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
      visiblePeople.reverse();
    }
  }

  return visiblePeople;
}

export const PeoplePage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';

  const visiblePeople = getVisiblePeople(
    people,
    query,
    centuries,
    sort,
    order,
    sex,
  );

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => {
        setHasLoadingError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const shouldShowNoMatchingPeople =
    !isLoading &&
    !hasLoadingError &&
    people.length > 0 &&
    visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasLoadingError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasLoadingError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasLoadingError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {shouldShowNoMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasLoadingError && visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  selectedSlug={slug}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
