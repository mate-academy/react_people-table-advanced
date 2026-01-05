import { useEffect, useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';
export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();
  const { slug } = useParams<{ slug?: string }>();

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (query) {
    visiblePeople = visiblePeople.filter(person => {
      const haystack = [person.name, person.motherName, person.fatherName]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person => {
      const bornCentury = Math.ceil(person.born / 100);

      return centuries.includes(String(bornCentury));
    });
  }

  if (sort) {
    visiblePeople.sort((a, b) => {
      const direction = order === 'desc' ? -1 : 1;

      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]) * direction;

        case 'born':
        case 'died':
          return (a[sort] - b[sort]) * direction;

        default:
          return 0;
      }
    });
  }

  const noPeopleOnServer = !isLoading && !hasError && people.length === 0;
  const noPeopleByFilters =
    !isLoading && !hasError && people.length > 0 && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {noPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noPeopleByFilters && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  selectedSlug={slug || null}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
