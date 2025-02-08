import { PeopleFilters } from './PeopleFilters';
import { useFilterPeople } from './FilterPeople';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState, useMemo } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const gender = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');

  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchPeople = async () => {
      try {
        const fetchedPeople = await getPeople();
        setPeople(fetchedPeople);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);


  const filteredPeople = useMemo(
    () => useFilterPeople(people, query, gender, centuries),
    [people, query, gender, centuries]
  );


  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && people.length > 0 && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !error && !people.length && (
                <p data-cy="noPeopleMessage">There are no people on the server</p>
              )}

              {!filteredPeople.length && !loading && <p>There are no people matching the current search criteria</p>}

              {!loading && !error && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
