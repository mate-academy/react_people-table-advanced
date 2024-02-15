import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [peopleError, setPeopleError] = useState(false);

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(pep => {
        if (pep.length <= 0) {
          setPeopleError(true);
        }

        setPeople(pep);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoader(false);
      });
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
              {loader && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {peopleError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loader && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
