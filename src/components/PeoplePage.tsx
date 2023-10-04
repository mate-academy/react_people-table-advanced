import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleList } from './PeopleList';
import { getSortedPeople } from '../helpers/getSortedPeople';

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPersons)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = persons.map(person => {
    return {
      ...person,
      mother: persons.find(({ name }) => person.motherName === name),
      father: persons.find(({ name }) => person.fatherName === name),
    };
  });

  const filteredPersons = getSortedPeople(
    preparedPeople,
    sort,
    order,
    query,
    sex,
    centuries,
  );

  const isSomethingWrong = isError && !isLoading;
  const isLoaded = !isError && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!persons.length && (
              <PeopleFilters
                query={query}
                sex={sex}
                centuries={centuries}
              />
            )}
          </div>
          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isSomethingWrong && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {(!persons.length && isLoaded) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!filteredPersons.length && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!filteredPersons.length && (
                <PeopleList
                  sort={sort}
                  order={order}
                  persons={filteredPersons}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
