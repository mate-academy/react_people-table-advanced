import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { UseHooks } from '../Hooks';
import { useEffect } from 'react';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const {
    loading,
    setLoading,
    setPeople,
    setError,
    error,
    people,
    setVisiblePeople,
  } = UseHooks();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(peopleFromServer => {
        setPeople(peopleFromServer);
        setVisiblePeople(peopleFromServer);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <p data-cy="peopleLoadingError">Something went wrong</p>;
  } else if (people.length === 0 && !loading) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  <PeopleTable />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
