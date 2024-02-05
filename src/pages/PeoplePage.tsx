import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { getPreparedPeople } from '../utils/getPreparedPeople';
import { doUpdate } from '../utils/doUpdate';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const isEmpty = !people.length && !isLoader && !isError;

  useEffect(() => {
    setIsLoader(true);

    getPeople()
      .then(peopleArr => setPeople(doUpdate(peopleArr)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoader(false));
  }, []);

  const preparedPeople = getPreparedPeople(people, searchParams);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && <PeopleFilters />}
          </div>
          <div className="column">
            <div className="box table-container">

              {isLoader && <Loader />}
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!preparedPeople.length
                ? (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                ) : <PeopleTable people={preparedPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
