/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../utils/filterPeople';
import { getSortedPeople } from '../utils/sortPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(data => {
        setAllPeople(data);
        setPeople(data);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filteredPeople = getFilteredPeople(allPeople, sex, query, centuries);
    const sortedPeople = getSortedPeople(filteredPeople, sort, order);

    setPeople(sortedPeople);
  }, [allPeople, sex, query, centuries, sort, order]);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !errorMessage && allPeople.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!loading && !errorMessage && allPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading &&
                !errorMessage &&
                allPeople.length > 0 &&
                people.length === 0 && (
                  <p data-cy="noFilteredPeopleMessage">
                    No people match the current criteria
                  </p>
                )}

              {!loading && !errorMessage && people.length > 0 && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
