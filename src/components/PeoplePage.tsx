import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Outlet } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [fetchingError, setFetchingError] = useState(false);
  const [loader, setLoader] = useState(true);

  // Fetch people and assign them to list
  useEffect(() => {
    // Reload/reset all data on component load
    setPeopleList([]);
    setFetchingError(false);
    setLoader(true);

    getPeople()
      .then(setPeopleList)
      .catch(() => setFetchingError(true))
      .finally(() => setLoader(false));
  }, []);

  // Cool idea I found on internet
  let content;

  if (loader) {
    content = <Loader />;
  } else if (fetchingError) {
    content = <p data-cy="peopleLoadingError">Something went wrong</p>;
  } else if (peopleList.length === 0) {
    content = (
      <p data-cy="noPeopleMessage">There are no people on the server</p>
    );
  } else {
    content = <PeopleTable peopleList={peopleList} />;
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loader && !fetchingError && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {content}
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
