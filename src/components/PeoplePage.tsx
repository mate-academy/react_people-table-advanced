import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { PeopleFilters } from './peopleFilters/PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { getPeople } from '../api';
import { filterPeople } from '../utils/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPeople();

        setPeople(data);
        setIsError(null);
      } catch {
        setIsError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const visiblePeople = useMemo(
    function () {
      return filterPeople(people, searchParams);
    },
    [people, searchParams],
  );

  const renderContent = () => {
    const isNotPeople = people.length === 0;
    const isNotVisiblePeople = visiblePeople.length === 0;

    if (isError) {
      return (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {isError}
        </p>
      );
    }

    if (isNotPeople) {
      return <p data-cy="noPeopleMessage">There are no people on the server</p>;
    }

    if (isNotVisiblePeople) {
      return <p>There are no people matching the current search criteria</p>;
    }

    return <PeopleTable people={visiblePeople} />;
  };

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
              {isLoading ? <Loader /> : renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
