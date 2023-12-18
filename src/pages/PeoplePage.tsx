import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { getPreparedPeople } from '../utils/getPreparedPeople';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('century');
  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = getPreparedPeople(
    people,
    sex,
    query,
    centuries,
    sortBy,
    sortOrder,
  );

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
              {isLoading && (
                <Loader />
              )}

              {!isLoading && !hasError && !people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasError && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {!isLoading && people.length !== 0 && (
                <PeopleTable
                  people={preparedPeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
