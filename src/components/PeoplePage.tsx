import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleFilters } from './PeopleFilters';
import { getPreparedPeople } from '../utils/filterPeople';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const query = searchParams.get('query');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const visiblePeople = useMemo(() => {
    return getPreparedPeople(people, {
      query,
      sort,
      order,
      sex,
      centuries,
    });
  }, [people, query, sort, order, sex, centuries]);

  const preparedParents = (parents: Person[]) => parents.map(parent => ({
    ...parent,
    mother: parents.find(({ name }) => name === parent.motherName),
    father: parents.find(({ name }) => name === parent.fatherName),
  }));

  useEffect(() => {
    setErrorMessage(false);
    setIsLoading(true);

    getPeople()
      .then(data => setPeople(preparedParents(data)))
      .catch((error) => {
        setErrorMessage(true);
        throw error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (<PeopleFilters />)}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && (<Loader />)}

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

              {!visiblePeople.length && !isLoading && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !errorMessage && !!visiblePeople.length && (
                <PeopleTable
                  people={visiblePeople}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
