import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { sortPeople } from '../utils/sortPeople';
import { filterPeople } from '../utils/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isNoPeople, setIsNoPeople] = useState(false);
  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') as keyof Person;
  const sortOrder = searchParams.get('sortOrder');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = peopleFromServer.map(person => ({
          ...person,
          mother: peopleFromServer
            .find(({ name }) => name === person.motherName),
          father: peopleFromServer
            .find(({ name }) => name === person.fatherName),
        }));

        setIsNoPeople(!preparedPeople.length);
        setPeople(preparedPeople);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  let preparedPeople = sortPeople(people, sortBy, sortOrder);

  preparedPeople = filterPeople(people, query, sex, centuries);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isNoPeople && !isLoading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && (
                <PeopleTable people={preparedPeople} />
              )}

              {preparedPeople.length === 0 && !isLoading && !isNoPeople && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
