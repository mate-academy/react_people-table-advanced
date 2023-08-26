import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { getParents } from '../helpers/getParents';
import { getFilteredPeople } from '../helpers/getFilteredPeople';
import { Person } from '../types';
import { getSortedPeople } from '../helpers/getSortedPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        setPeople(getParents(peopleFromServer));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const isAnyPerson = people.length > 0;
  const filteredPeople = getFilteredPeople(people, { sex, centuries, query });
  const sortedPeople = getSortedPeople(filteredPeople, { sort, order });

  const isShow = {
    peopleList: !isLoading && !isError && isAnyPerson,
    noPeopleNotification: !isAnyPerson && !isLoading && !isError,
    noPeopleFound: !isLoading && !isError && !sortedPeople.length,
  };

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
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isShow.noPeopleNotification && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isShow.noPeopleFound && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isShow.peopleList
                && <PeopleTable people={sortedPeople} />}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
