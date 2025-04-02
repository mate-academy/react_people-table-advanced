import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';

export const PeoplePage = () => {
  const [loader, setLoader] = useState(false);
  const [people, setPeople] = useState<Person[] | []>([]);
  const [error, setError] = useState(false);
  const [noPeopleLoaded, setNoPeopleLoaded] = useState(false);

  useEffect(() => {
    setNoPeopleLoaded(false);
    setError(false);
    setLoader(true);

    getPeople()
      .then(res => {
        setPeople(res);
        if (res.length === 0) {
          setNoPeopleLoaded(true);
        }
      })
      .catch(() => setError(true))
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
              {!loader &&
                (!error && noPeopleLoaded ? (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                ) : (
                  !error && !noPeopleLoaded && <PeopleTable people={people} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
