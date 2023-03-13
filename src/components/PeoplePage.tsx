import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [listPeople, setListPeople] = useState<Person[] | []>([]);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPeople().then((res: Person[]) => {
      if (!res.length) {
        setError(true);
      }

      console.log(res);
      setListPeople(res);
    }).catch(() => setError(true));
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
              {!listPeople.length && !error ? <Loader /> : (
                <>
                  {error
                    && <p data-cy="peopleLoadingError">Something went wrong</p>}

                  {!listPeople.length && error
                    && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                  {notFound && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}

                  <PeopleTable
                    listPeople={listPeople}
                    setNotFound={setNotFound}
                  />
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
