import { useState, useEffect } from 'react';
import { useSearchParams as useRouterSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { prepareFilteredPeople } from '../utils/prepareFilteredPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [peopleError, setPeopleError] = useState('');
  const [searchParams, setSearchParams] = useRouterSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const visiblePeople = prepareFilteredPeople(people, {
    sort, order, sex, query, centuries,
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const peopleData = await getPeople();

      setPeople(peopleData);
    } catch (error) {
      setPeopleError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {peopleError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {peopleError}
                </p>
              )}

              {!isLoading && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && !visiblePeople.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!people.length && !!visiblePeople.length && (
                <PeopleTable
                  people={visiblePeople}
                  searchParams={searchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
