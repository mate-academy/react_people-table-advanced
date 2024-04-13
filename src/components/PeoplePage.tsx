import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types/Person';
import { sortPeople } from '../utils/Sort';
import { filterPeople } from '../utils/Filter';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const preparedParents = (parents: Person[]) =>
    parents.map(parent => ({
      ...parent,
      mother: parents.find(({ name }) => name === parent.motherName),
      father: parents.find(({ name }) => name === parent.fatherName),
    }));

  useEffect(() => {
    setErrorMessage(false);
    setIsLoading(true);

    getPeople()
      .then(data => setPeople(preparedParents(data)))
      .catch(error => {
        setErrorMessage(true);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  let visiblePeople = filterPeople(people, searchParams);

  visiblePeople = sortPeople(visiblePeople, searchParams);

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
                  Something went wrong
                </p>
              )}

              {!people.length && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!!people.length && !visiblePeople.length && (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {!isLoading && !errorMessage && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
