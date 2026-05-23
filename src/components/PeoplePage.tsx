import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleContext } from '../context';

export const PeoplePage = () => {
  const people = useContext(PeopleContext).people;
  const setPeople = useContext(PeopleContext).setPeople;

  const [errorPeople, setErrorPeople] = useState(false);
  const [loader, setLoader] = useState(false);
  const noPeople = !loader && !errorPeople && people.length === 0;
  const [noPeopleOnServer, setNoPeopleOnServer] = useState(false);

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(arrPeople => {
        if (arrPeople.length === 0) {
          setNoPeopleOnServer(true);
        }

        setPeople(arrPeople);
      })
      .catch(() => {
        setErrorPeople(true);
      })
      .finally(() => {
        setLoader(false);
        setTimeout(() => {
          setErrorPeople(false);
        }, 3000);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loader && !errorPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}

              {errorPeople && !loader && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {noPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loader && !errorPeople && people.length > 0 && (
                <PeopleTable people={people} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
