import React, { useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { ErrorNotification } from '../components/ErrorNotification';
import { NoPeople } from '../components/NoPeople';
import { PeopleFilters } from '../components/PeopleFilters';
import { useDispatch } from '../castomHuks/useDispatch';
import { useGlobalState } from '../castomHuks/useGlobalState';
import { peopleWithParents } from '../utils/peopleWithParents';
import { NoPeopleMatching } from '../components/NoPeopleMatchig';
import { useSearchParams } from 'react-router-dom';
import { sortAndFilterPeople } from '../utils/sortAndFilterPeople';

export const PeoplePage: React.FC = () => {
  const { people, isLoading } = useGlobalState();
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getPeople()
      .then(data => dispatch({ type: 'get', payload: peopleWithParents(data) }))
      .catch(() => setError(true))
      .finally(() => dispatch({ type: 'isLoading', payload: false }));
  }, [dispatch]);

  const sortedAndFilteredPeople = useMemo(() => {
    return sortAndFilterPeople(people, searchParams);
  }, [people, searchParams]);

  useEffect(() => {
    dispatch({
      type: 'setSortedAndFiltered',
      payload: sortedAndFilteredPeople,
    });
  }, [sortedAndFilteredPeople, dispatch]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && error && <ErrorNotification />}

              {!isLoading && !error && !people.length && <NoPeople />}

              {!isLoading &&
                !error &&
                people.length !== 0 &&
                sortedAndFilteredPeople.length === 0 && <NoPeopleMatching />}

              {!isLoading &&
                !error &&
                people.length !== 0 &&
                sortedAndFilteredPeople.length !== 0 && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
