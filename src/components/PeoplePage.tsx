import { useEffect, useState } from 'react';

import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

// import { useSearchParamsContext } from '../SearchParamsContext';

export const PeoplePage = () => {
  // const { searchParams, setSearchParams } = useSearchParamsContext();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then((data) => {
        setPeople(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setHasError(true);
      });
  }, []);

  const renderContent = () => {
    switch (true) {
      case hasError:
        return <p data-cy="peopleLoadingError">Something went wrong</p>;

      case isLoading:
        return <Loader />;

      case people.length === 0:
        return (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        );

      default:
        return <PeopleTable people={people} />;
    }
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
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
