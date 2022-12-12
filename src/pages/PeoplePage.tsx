import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';
import { Errors } from '../types/Errors';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState<Errors>(Errors.NONE);
  const [isLoad, setIsLoad] = useState(false);

  const loadPeople = async () => {
    setIsLoad(true);
    try {
      const peopleFromServer = await getPeople();

      if (peopleFromServer.length === 0) {
        setIsError(Errors.EMPTY);
      }

      setPeople(peopleFromServer);
    } catch (error) {
      setIsError(Errors.LOAD);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && !isLoad && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters setIsError={setIsError} />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoad && (<Loader />)}

              {isError === Errors.LOAD && (
                <p data-cy="peopleLoadingError">{Errors.LOAD}</p>
              )}

              {isError === Errors.EMPTY && (
                <p data-cy="noPeopleMessage">
                  {Errors.EMPTY}
                </p>
              )}

              {isError === Errors.SAERCH && (
                <p>{Errors.SAERCH}</p>
              )}

              {people.length > 0 && !isError && !isLoad && (
                <PeopleTable
                  people={people}
                  setIsError={setIsError}
                />
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};
