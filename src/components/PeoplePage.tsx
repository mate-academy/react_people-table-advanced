import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { getPreparedPeople } from '../utils/functions';
import { FilterParams } from '../types/Filters';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get(FilterParams.Query) || '';
  const centuries = searchParams.getAll(FilterParams.Centuries) || [];
  const sex = searchParams.get(FilterParams.Sex) || null;
  const sort = searchParams.get(FilterParams.Sort) || null;
  const order = searchParams.get(FilterParams.Order) || null;

  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const preparedPeople = getPreparedPeople(
    people,
    sex,
    centuries,
    query,
    sort,
    order,
  );

  const isNoPeopleMessage = !people.length && !errorMessage && !isLoading;
  const isErrorMessage = errorMessage && !isLoading;
  const isShowPeople = !isErrorMessage && !!preparedPeople.length;
  const isNoMatchingPeople = !preparedPeople.length && query;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isErrorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {isNoPeopleMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoMatchingPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {isShowPeople && (<PeopleTable people={preparedPeople} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
