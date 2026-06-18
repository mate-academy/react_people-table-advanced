import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { SortField } from '../types/SortField';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const hasPeople = !loading && !hasError && people.length > 0;
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortField = sort as SortField | null;

  useEffect(() => {
    setHasError(false);
    setLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = people
    .filter(person => {
      if (sex && person.sex !== sex) {
        return false;
      }

      if (centuries.length > 0) {
        const century = Math.ceil(person.born / 100);

        if (!centuries.includes(String(century))) {
          return false;
        }
      }

      if (query) {
        return (
          person.name.toLowerCase().includes(query) ||
          (person.motherName || '').toLowerCase().includes(query) ||
          (person.fatherName || '').toLowerCase().includes(query)
        );
      }

      return true;
    })
    .sort((a, b) => {
      if (!sortField) {
        return 0;
      }

      const valueA = a[sortField];
      const valueB = b[sortField];

      if (valueA > valueB) {
        return order === 'desc' ? -1 : 1;
      }

      if (valueA < valueB) {
        return order === 'desc' ? 1 : -1;
      }

      return 0;
    });

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {hasPeople && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && hasError && people.length === 0 && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!loading && !hasError && visiblePeople.length === 0 && (
                <p data-cy="noPeopleMessage">No people available</p>
              )}

              {!loading && !hasError && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
