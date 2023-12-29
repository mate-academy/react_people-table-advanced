import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { FilterPeople } from '../../utils/FilterPeople';

export const PeoplePage = () => {
  const [
    peopleFromServer,
    setPeopleFromServer,
  ] = useState<Person[] | null>(null);

  const [isRequestFailed, setIsRequestFailed] = useState(false);
  const isLoading = !isRequestFailed && !peopleFromServer;
  const filteredPeople = FilterPeople(peopleFromServer);
  const noMatchMsg = 'There are no people matching the current search criteria';

  useEffect(
    () => {
      getPeople()
        .then(people => {
          setPeopleFromServer(people.map(person => ({
            ...person,
            mother: people.find(
              possibleMother => (possibleMother.name === person.motherName),
            ),
            father: people.find(
              possibleFather => (possibleFather.name === person.fatherName),
            ),
          })));
        })
        .catch(() => {
          setIsRequestFailed(true);
        });
    },
    [],
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {peopleFromServer && peopleFromServer.length && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isRequestFailed && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {peopleFromServer && (
                <>
                  {peopleFromServer.length ? (
                    <>
                      {filteredPeople && filteredPeople.length ? (
                        <PeopleTable people={filteredPeople} />
                      ) : (
                        <p>
                          {noMatchMsg}
                        </p>
                      )}
                    </>
                  ) : (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
