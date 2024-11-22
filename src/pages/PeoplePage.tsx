import { useContext, useEffect, useState } from 'react';
import { PeopleContext } from '../store/PeopleContent';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const { setPeopleLoader, setPeople, peopleLoader, peopleToShow, people } =
    useContext(PeopleContext);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setErrorMessage('');
    setPeopleLoader(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => {
        setPeopleLoader(false);
      });
  }, [setPeople, setPeopleLoader, setErrorMessage]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!!people.length && !peopleLoader && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {peopleLoader && <Loader />}

              {!peopleLoader && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {errorMessage}
                </p>
              )}

              {!people.length && !peopleLoader && !errorMessage && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!!peopleToShow.length && !peopleLoader && <PeopleTable />}

              {!peopleToShow.length && !peopleLoader && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>{' '}
          </div>
        </div>
      </div>
    </>
  );
};
