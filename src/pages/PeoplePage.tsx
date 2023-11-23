import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { preparePeople } from '../utils/preparePeople';
import { Filters } from '../types/Filters';
import { Sorting } from '../types/Sorting';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  const filters: Filters = {
    query: searchParams.get('query') || '',
    centuries: searchParams.getAll('centuries') || '',
    sex: searchParams.get('sex') || '',
  };

  const sorting: Sorting = {
    sort: searchParams.get('sort') as keyof Person,
    order: searchParams.get('order'),
  };

  useEffect(() => {
    const loadPeople = async () => {
      setIsError(false);

      try {
        const loadedPeople = await getPeople();

        setPeople(loadedPeople);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadPeople();
  }, []);

  const peopleToDisplay: Person[] = preparePeople(people, filters, sorting);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {peopleToDisplay.length > 0 && (
                <PeopleTable
                  people={peopleToDisplay}
                />
              )}

              {(peopleToDisplay.length === 0 && !isLoading) && (
                'There are no people matching the current search criteria'
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
