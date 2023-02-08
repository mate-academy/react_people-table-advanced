import { memo, useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { findParent } from './Helpers';

export const PeoplePage = memo(
  () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [isLoading, setIsloading] = useState(false);
    const [hasError, setHesError] = useState(false);
    const [isPeopleLoaded, setIsPeopleLoaded] = useState(false);

    useEffect(() => {
      setIsloading(true);

      getPeople()
        .then((peopleFromServer) => {
          const peopleWithParents: Person[] = peopleFromServer.map(person => ({
            ...person,
            mother: findParent(person.motherName, peopleFromServer),
            father: findParent(person.fatherName, peopleFromServer),
          }));

          setPeople(peopleWithParents);
          setIsPeopleLoaded(true);
        })
        .catch(() => setHesError(true))
        .finally(() => setIsloading(false));
    }, []);

    const isPeopleEmpty = people.length === 0 && isPeopleLoaded;
    const shouldPeopleBeRendered = !hasError && people.length > 0;

    return (
      <>
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {isLoading || <PeopleFilters />}
            </div>

            <div className="column">
              <div className="box table-container">

                {isLoading && <Loader />}

                {hasError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {isPeopleEmpty && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {shouldPeopleBeRendered && (
                  <PeopleTable people={people} />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
);
