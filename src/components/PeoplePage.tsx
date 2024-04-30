import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPreparedPeople } from '../utils/getPreparedPeople';

export const PeoplePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const isReversed = searchParams.get('order') === 'desc';

  const isNotPeopleListEmpty = isLoaded && !hasError && people.length;
  const isPeopleListEmpty = isLoaded && !hasError && !people.length;
  const isResponseNotOk = isLoaded && hasError;

  useEffect(() => {
    setIsLoaded(false);

    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = peopleFromServer.map(person => ({ ...person }));

        preparedPeople.forEach(person => {
          Object.assign(person, {
            mother:
              preparedPeople.find(
                mother => mother.name === person.motherName,
              ) || null,
            father:
              preparedPeople.find(
                father => father.name === person.fatherName,
              ) || null,
          });
        });

        setPeople(preparedPeople);
      })
      .catch(() => setError(true))
      .finally(() => setIsLoaded(true));
  }, []);

  const preparedPeople = getPreparedPeople(people, {
    sex,
    query,
    centuries,
    sortField,
    isReversed,
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoaded && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {!isLoaded && <Loader />}

              {isResponseNotOk && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isPeopleListEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNotPeopleListEmpty && <PeopleTable people={preparedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
