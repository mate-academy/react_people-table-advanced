import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { getPeopleWithParents } from '../../utils/getPeopleWithParents';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasPeopleError, setHasPeopleError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPeopleFromServer = async () => {
    try {
      setIsLoading(true);
      const fetchPeople = await getPeople();
      const fetchedPeople = getPeopleWithParents(fetchPeople);

      setPeople(fetchedPeople);
    } catch {
      setHasPeopleError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  const isPeopleVisible = !isLoading && Boolean(people.length);
  const isPeopleMessageVisible = !isLoading && !people.length;

  return (
    <>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">

          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isPeopleVisible && (
                <PeopleTable people={people} />
              )}

              {hasPeopleError && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {isPeopleMessageVisible && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* <p>There are no people matching the current search criteria</p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
