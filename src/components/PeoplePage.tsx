import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { slug } = useParams();

  async function getPeopleFromServer() {
    setIsLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setHasError(false);

      setPeople(peopleFromServer);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPeopleFromServer();
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
              {isLoading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {/* <p data-cy="noPeopleMessage">
                There are no people on the server
                There are no people matching the current search criteria</p>
              </p>*/}

              {people && (
                <PeopleTable
                  people={people}
                  personSlug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
