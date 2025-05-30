/* eslint-disable react-hooks/exhaustive-deps */
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useContext, useEffect } from 'react';
import { Context } from '../context/PeopleContext';
import { fetchClient } from '../utils/fetchClient';

export const PeoplePage = () => {
  const {
    loading,
    error,
    people,
    setLoading,
    setError,
    setPeople,
    visiblePeople,
  } = useContext(Context);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchClient();

        setPeople(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && !error && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && !error && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!error && !loading && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!error && !loading && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!error && !loading && visiblePeople.length > 0 && (
                <PeopleTable />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
