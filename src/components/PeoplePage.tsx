import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { SortField } from '../types/SortField';
import {
  prepareFilteredAndSortedPeople,
} from '../utils/prepareFilteredAndSortedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortField = searchParams.get('sort') as SortField || SortField.All;
  const sortOrder = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(response => {
        const preparedPeople: Person[] = response.map(human => (
          {
            ...human,
            mother: response.find(({ name }) => name === human.motherName),
            father: response.find(({ name }) => name === human.fatherName),
          }
        ));

        setPeople(preparedPeople);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = useMemo(() => prepareFilteredAndSortedPeople(people,
    {
      sex,
      query,
      centuries,
      sortField,
      sortOrder,
    }), [sex, query, centuries, sortField, sortOrder]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {people.length === 0 && !loading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people.length !== 0
                && !error
                && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
