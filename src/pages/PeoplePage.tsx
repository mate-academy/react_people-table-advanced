import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { slug } = useParams();

  const loadPeopleFromServer = async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadPeopleFromServer();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isLoaded && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {!isLoaded && (
                <Loader />
              )}

              {isLoaded && errorMessage && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {/* <p data-cy="noPeopleMessage">
                There are no people on the server
              </p> */}

              {/* <p>There are no people matching the current search criteria</p> */}

              {isLoaded && !errorMessage && (
                <PeopleTable
                  people={people}
                  selectedPersonSlug={slug}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
