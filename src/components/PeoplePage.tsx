import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';

import { Errors } from '../types/Errors';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeopleFromServer)
      .catch(() => setErrorMessage(Errors.wentWrong))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : (
                <PeopleTable
                  peopleFromServer={peopleFromServer}
                  setPeopleFromServer={setPeopleFromServer}
                />
              )}

              {errorMessage === Errors.wentWrong && (
                <p data-cy="peopleLoadingError">{Errors.wentWrong}</p>
              )}

              {errorMessage === Errors.noPeople && (
                <p data-cy="noPeopleMessage">{Errors.noPeople}</p>
              )}

              {errorMessage === Errors.noMatches && <p>{Errors.noMatches}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
