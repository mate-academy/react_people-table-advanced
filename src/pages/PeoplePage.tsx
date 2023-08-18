import React, { useEffect, useMemo } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = React.useState<Person[]>([]);
  const [errorMsg, setErrorMsg] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setErrorMsg('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const preparedPeople = useMemo(() => people.map((person) => ({
    ...person,
    mother: people.find((p) => p.name === (person.motherName || '-')),
    father: people.find((p) => p.name === (person.fatherName || '-')),
  })), [people]);

  const toShow = !isLoading && !errorMsg && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {toShow && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && errorMsg && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMsg}
                </p>
              )}

              {!isLoading && !errorMsg && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {toShow && (
                <PeopleTable people={preparedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
