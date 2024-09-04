import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { Person } from '../../types';
import { getPreparedPerson } from '../../utils/getPreparedPeople';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [peopleList, setPeopleList] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(result => {
        setPeopleList(result);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));

    return () => {
      setPeopleList([]);
    };
  }, []);

  const preparedPeople = getPreparedPerson(peopleList);

  return (
    <div data-cy="app">
      <main className="section">
        <div className="container">
          <h1 className="title">People Page</h1>
          <div className="block">
            <div className="box table-container">
              {isLoading && <Loader />}
              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {peopleList.length === 0 && !isLoading && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {peopleList.length > 0 && <PeopleTable people={preparedPeople} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
