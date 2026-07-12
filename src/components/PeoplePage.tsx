/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Person } from '../types/Person';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

export const PeoplePage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  let visiblePeople = [...people];

  if (query) {
    const normalizedQuery = query.toLowerCase();

    visiblePeople = visiblePeople.filter(person =>
      [person.name, person.motherName, person.fatherName].some(name =>
        name?.toLowerCase().includes(normalizedQuery),
      ),
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
    visiblePeople.sort((personA, personB) => {
      let result = 0;

      if (sort === 'name' || sort === 'sex') {
        result = personA[sort].localeCompare(personB[sort]);
      }

      if (sort === 'born' || sort === 'died') {
        result = personA[sort] - personB[sort];
      }

      return order === 'desc' ? -result : result;
    });
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !hasError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading &&
                !hasError &&
                people.length > 0 &&
                visiblePeople.length === 0 && (
                  <p>There are no people matching the current search criteria</p>
                )}

              {!isLoading && !hasError && visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  allPeople={people}
                  selectedSlug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

