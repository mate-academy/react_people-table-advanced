import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [preparedPeople, setPreparedPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(people => {
        setHasLoadingError(false);
        setPreparedPeople(people.map(person => {
          const mother = people
            .find(item => item.name === person.motherName);

          const father = people
            .find(item => item.name === person.fatherName);

          return { ...person, mother, father };
        }));
      })
      .catch(() => setHasLoadingError(true))
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

              {!isLoading && hasLoadingError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasLoadingError
                && preparedPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !hasLoadingError
                && preparedPeople.length !== 0 && (
                <PeopleTable people={preparedPeople} slug={slug} />
              )}

              {/* <p>There are no people matching the current search criteria</p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
