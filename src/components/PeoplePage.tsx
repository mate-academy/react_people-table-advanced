/* eslint-disable no-nested-ternary */
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from './Loader';
import FetchError from './FetchError';
import NoPeopleMessage from './NoPeopleMessage';
import PeopleTable from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { getPreparedPeople } from '../utils/getPreparedPeople';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        setPeople(peopleFromServer);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visiblePeople = useMemo(
    () => getPreparedPeople(people, { query, sex, centuries }),
    [people, query, sex, centuries],
  );

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : visiblePeople.length > 0 ? (
                <PeopleTable people={visiblePeople} />
              ) : (
                <p>There are no people matching the current search criteria</p>
              )}
              {isError && <FetchError />}
              {!isLoading && people.length === 0 && <NoPeopleMessage />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PeoplePage;
