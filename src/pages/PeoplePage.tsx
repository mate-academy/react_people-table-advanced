import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilter';
import { PeopleTable } from '../components/PeopleTable';
import { getPeople } from '../api';
import { addParentsToPeople } from '../utils/addParentsToPeople';
import { getVisiblePeople } from '../utils/getVisiblePeople';
import { Person, Nullable } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<Nullable<string>>(null);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setErrorMessage(null);
    getPeople()
      .then(peopleFromServer => {
        const peopleWithParents = addParentsToPeople(peopleFromServer);

        setPeople(peopleWithParents);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = getVisiblePeople(people, searchParams);

  const isLoaded = !isLoading && !errorMessage;
  const hasPeople = people.length > 0;
  const hasVisiblePeople = visiblePeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {isLoaded && hasPeople && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {errorMessage && (
                <p data-cy="peopleLoadingError">{errorMessage}</p>
              )}

              {isLoaded && !hasPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isLoaded && hasPeople && !hasVisiblePeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {isLoaded && hasVisiblePeople && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
