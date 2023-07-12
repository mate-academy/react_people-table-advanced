import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Person, Sex } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import {
  getVisiblePeople,
  getPeopleFiltered,
  getPeopleSorted,
} from '../helpers/helpers';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const [searchParams] = useSearchParams();

  const sexP: string | null = searchParams.get('sex');
  const sex: Sex | null = sexP !== null ? sexP as Sex : null;
  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const order = searchParams.get('order') || null;
  const sort = searchParams.get('sort') || null;

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);

      try {
        const response = await getPeople();

        setPeople(response);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(`Something went wrong: ${error.message}`);
        }
      }

      setIsLoading(false);
    };

    fetchPeople();
  }, []);

  const peopleWithParents = getVisiblePeople(people);
  const filteredPeople = getPeopleFiltered(
    peopleWithParents, sex, query, centuries,
  );
  const sortedPeople = getPeopleSorted(filteredPeople, order, sort);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !errorMessage && people.length > 0 && (
              <PeopleFilters
                sex={sex}
                query={query}
                centuries={centuries}
              />
            )}

          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {!isLoading && !errorMessage && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading
              && !errorMessage
              && people.length > 0
              && filteredPeople.length === 0
              && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {!isLoading && !errorMessage && filteredPeople.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  order={order}
                  sort={sort}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
