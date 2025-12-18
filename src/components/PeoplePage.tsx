import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = [...people]
    .filter(person => {
      const lowerQuery = query.toLowerCase();

      return (
        person.name.toLowerCase().includes(lowerQuery) ||
        (person.motherName?.toLowerCase() || '').includes(lowerQuery) ||
        (person.fatherName?.toLowerCase() || '').includes(lowerQuery)
      );
    })

    .filter(person => !sex || person.sex === sex)
    .filter(person => {
      if (!centuries.length) {
        return true;
      }

      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    })
    .sort((a, b) => {
      if (!sort) {
        return 0;
      }

      let comparison = 0;

      switch (sort) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'sex':
          comparison = a.sex.localeCompare(b.sex);
          break;
        case 'born':
          comparison = a.born - b.born;
          break;
        case 'died':
          comparison = (a.died ?? Infinity) - (b.died ?? Infinity);
          break;
        default:
          return 0;
      }

      return order === 'desc' ? -comparison : comparison;
    });

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="columns is-desktop is-flex-direction-row-reverse">
        {!isLoading && (
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>
        )}

        <div className="column">
          <div className="box table-container">
            {isLoading && <Loader />}

            {!isLoading && error && (
              <p data-cy="peopleLoadingError">Something went wrong</p>
            )}

            {!isLoading && !error && !visiblePeople.length && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!isLoading && !error && visiblePeople.length > 0 && (
              <PeopleTable people={visiblePeople} selectedSlug={slug} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
