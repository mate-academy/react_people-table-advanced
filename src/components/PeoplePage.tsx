/* eslint-disable @typescript-eslint/indent */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { useSearchParams, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const { slug } = useParams<{ slug: string }>();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  let visiblePeople = [...people];

  if (query) {
    const normalizedQuery = query.toLowerCase();

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

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });
  }

  if (sort === 'name') {
    visiblePeople.sort((a, b) =>
      order === 'desc'
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name),
    );
  }

  if (sort === 'sex') {
    visiblePeople.sort((a, b) =>
      order === 'desc'
        ? b.sex.localeCompare(a.sex)
        : a.sex.localeCompare(b.sex),
    );
  }

  if (sort === 'born') {
    visiblePeople.sort((a, b) =>
      order === 'desc' ? b.born - a.born : a.born - b.born,
    );
  }

  if (sort === 'died') {
    visiblePeople.sort((a, b) =>
      order === 'desc' ? b.died - a.died : a.died - b.died,
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
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
                  <p data-cy="noPeopleMessage">
                    There are no people matching the current search criteria
                  </p>
                )}
              {!isLoading && !hasError && visiblePeople.length > 0 && (
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
