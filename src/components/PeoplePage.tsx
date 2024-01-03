import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { getPreparedPeople } from '../helpers/GetPreparedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((loadingPeople) => setPeople(loadingPeople))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleForRender = getPreparedPeople(people, {
    sort,
    query,
    sex,
    centuries,
    order,
  });

  return (
    <>
      <h1 className="title">People Page</h1>
      {isLoading
        ? <Loader />
        : (
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  {isError && !isLoading && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {!people.length && !isLoading && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  {!peopleForRender.length && !isLoading
                    ? (
                      <p>
                        There are no people matching the current search criteria
                      </p>
                    ) : (
                      people.length > 0 && !isLoading && (
                        <PeopleTable people={peopleForRender} />
                      )
                    )}
                </div>
              </div>
            </div>
          </div>

        )}

    </>
  );
};
