import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { useSearchParams } from 'react-router-dom';
import { sortPeople } from '../utils/sortPeople';
import { filterPeople } from '../utils/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isServerEmpty = !people.length && !isLoading && !errorMessage;

  const [searchParams] = useSearchParams();
  const centuries = searchParams
    .getAll('centuries')
    .map(century => parseInt(century))
    .filter(century => !isNaN(century));

  const preparedPeople = sortPeople(
    filterPeople(
      people,
      searchParams.get('query'),
      centuries,
      searchParams.get('sex'),
    ),
    searchParams.get('sort'),
    searchParams.get('order') ? 'desc' : 'asc',
  );

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

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

              {errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!!people.length && <PeopleTable people={preparedPeople} />}

              {isServerEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
