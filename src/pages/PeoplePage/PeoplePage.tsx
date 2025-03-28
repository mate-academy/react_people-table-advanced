import { PeopleFilters } from '../../components/PeopleFilters';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';
import { getPeople } from '../../api';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Person } from '../../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Array<Person> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.startsWith('/people')) {
      return;
    }

    setIsLoading(true);

    const fetchPeople = async () => {
      try {
        const data = await getPeople();

        setPeople(data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, [pathname]);

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
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people?.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              <p>There are no people matching the current search criteria</p>
              {people && people?.length >= 1 && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
