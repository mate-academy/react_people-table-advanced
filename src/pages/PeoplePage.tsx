import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { getPeople } from '../api';
import { Person } from '../types';
import { Outlet } from 'react-router-dom';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    loading: false,
    people: false,
  });

  useEffect(() => {
    const fetchPeople = async () => {
      setIsLoading(true);
      try {
        const fetchedPeople = await getPeople();

        setPeople(fetchedPeople);
        if (!fetchedPeople.length) {
          setErrors(prev => ({ ...prev, people: true }));
        }
      } catch {
        setErrors(prev => ({ ...prev, loading: true }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  useEffect(() => {
    if (errors.loading || errors.people) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrors({ loading: false, people: false });
    }, 2000);

    return () => clearTimeout(timerId);
  }, [errors.loading, errors.people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              {isLoading && <Loader />}
              {!errors.loading && !errors.people && <PeopleFilters />}
            </div>

            <div className="column">
              <div className="box table-container">
                {errors.loading && (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                )}

                {errors.people && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {!errors.loading && !errors.people && (
                  <Outlet context={{ people }} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
