import { useEffect, useState } from 'react';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPeopleFromServer = async () => {
    setIsLoading(true);
    try {
      const peopleFromServer = await getPeople();

      setIsLoading(false);
      setPeople(peopleFromServer);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    getPeopleFromServer();
  }, []);

  if (people.length === 0 && isLoading === false) {
    return (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    );
  }

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

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isLoading
                ? (<Loader />)
                : (<PeopleTable people={people} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
