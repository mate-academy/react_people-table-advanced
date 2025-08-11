import React, { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PeopleTable } from '../../components/People';
import { PeopleFilters } from '../../components/People/PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries') || [];

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const isPeopleErrorShown = !isError && people.length <= 0;
  const isPeopleTableShown = !isError && people.length > 0;

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

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
                query={query}
                sex={sex}
                centuries={centuries}
              />
            )}
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {isError && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {isPeopleErrorShown && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {isPeopleTableShown && (
                    <PeopleTable
                      people={people}
                      query={query}
                      sex={sex}
                      centuries={centuries}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
