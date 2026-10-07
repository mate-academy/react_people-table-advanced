import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { Person } from '../types';
import { getPeople } from '../api';
import { getSortedPeople } from '../utils/getSortedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = getFilteredPeople(people, query, sex, centuries);

  const sortedPeople = getSortedPeople(filteredPeople, sort, order);

  useEffect(() => {
    setLoading(true);

    const loadPeople = async () => {
      try {
        const peopleData = await getPeople();

        setPeople(peopleData);
      } catch {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    loadPeople();
  }, []);

  const hasPeople = people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {hasPeople && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && <p data-cy="peopleLoadingError">{error}</p>}

              {!hasPeople && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}

              {hasPeople && <PeopleTable people={sortedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
