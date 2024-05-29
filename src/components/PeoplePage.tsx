import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { filterPeople } from '../utils/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  let filteredPeople: Person[] = [];

  if (people) {
    filteredPeople = filterPeople(people, {
      sex: searchParams.get('sex') || 'All',
      query: searchParams.get('query') || '',
      centuries: searchParams.getAll('centuries') || [],
    });
  }

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return <p data-cy="peopleLoadingError">{errorMessage}</p>;
  }

  if (people?.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  if (filteredPeople.length === 0) {
    return (
      <p data-cy="noFilteredPeopleMessage">
        There are no people matching the current search criteria
      </p>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              <PeopleTable people={filteredPeople} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
