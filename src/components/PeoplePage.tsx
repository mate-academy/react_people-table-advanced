import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Errors } from '../types/Errors';
import { setParents } from '../utils/setParents';
import { handleErrorMessage } from '../utils/handleErrorMessage';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<Errors>(Errors.Default);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then(people => {
        setPeopleFromServer(people);

        if (people.length === 0) {
          setErrorMessage(Errors.NoPeople);
        }
      })
      .catch(() => setErrorMessage(Errors.Loading))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const people = setParents(peopleFromServer);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isloading ? null : <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {errorMessage && (
                <p data-cy={handleErrorMessage(errorMessage)}>{errorMessage}</p>
              )}

              {isloading ? (
                <Loader />
              ) : people.length ? (
                <PeopleTable people={people} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
