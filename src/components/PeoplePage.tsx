import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        return data.map(d => {
          const mother = data.find(({ name }) => name === d.motherName);
          const father = data.find(({ name }) => name === d.fatherName);

          return { ...d, mother, father };
        });
      })
      .then(setPeople)
      .catch(setFetchError)
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
              {fetchError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : null}

              {!isLoading && !people.length ? (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              ) : null}

              {!people.length && false ? (
                <p>There are no people matching the current search criteria</p>
              ) : null}

              {isLoading ? <Loader /> : <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
