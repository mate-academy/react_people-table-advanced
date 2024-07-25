import { PeopleFilters } from '../components/PeopleFilters';
import { useState, useEffect, useMemo } from 'react';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { filterPeople } from '../utils/filterPeople';
import { SortPeople } from '../utils/SortPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  const filteredPeople = useMemo(
    () => filterPeople(people, { sex, query, centuries }),
    [people, sex, query, centuries],
  );

  const sortedPeople = useMemo(
    () => SortPeople(filteredPeople, { sort, order }),
    [filteredPeople, sort, order],
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            {loading && <Loader />}
            {error && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}
            {!loading && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}
            {!loading && people.length > 0 && (
              <PeopleTable
                people={sortedPeople}
                selectedPersonSlug={slug || ''}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
