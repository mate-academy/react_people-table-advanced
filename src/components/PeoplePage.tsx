import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { getFilteredPeople } from '../utils/getFiltredPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [loadPeople, setLoadPeople] = useState(false);
  const [searchParams] = useSearchParams();

  const hasError = !loadPeople && error;
  const noPeople = people.length === 0 && !loadPeople;
  const showContent = !loadPeople && people.length > 0;

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const filteredAndSortedPeople = getFilteredPeople(people, {
    sex,
    query,
    centuries,
    sort,
    order,
  });

  useEffect(() => {
    setLoadPeople(true);
    getPeople()
      .then(res => {
        setPeople(res);
        setError(false);
        setLoadPeople(false);
      })
      .catch(() => {
        setError(true);
        setLoadPeople(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {loadPeople && <Loader />}
        {hasError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}
        {noPeople && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
        {showContent && (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>

            <div className="column">
              <div className="box table-container">
                <PeopleTable people={filteredAndSortedPeople} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
