import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';
import { SortParams } from '../types/sortParams';
import { getFilteredPeople } from '../utils/getFilteredPeople';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const filteredPeople = getFilteredPeople(people, {
    query: searchParams.get('query') || '',
    century: searchParams.getAll('century') || [],
    filterSex: searchParams.get('filterSex') || '',
    sort: searchParams.get('sort') as SortParams,
    order: searchParams.get('order') || '',
  });

  useEffect(() => {
    setError(false);

    getPeople()
      .then(setPeople)
      .then(() => setLoader(false))
      .catch(() => {
        setLoader(false);
        setError(true);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      {loader ? (
        <Loader />
      ) : (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <Outlet />
            </div>
            <div className="column">
              <div className="box table-container">
                {!people.length && !error && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
                {error ? (
                  <p data-cy="peopleLoadingError">Something went wrong</p>
                ) : (
                  <PeopleTable people={filteredPeople} />
                )}

                {/* <p>There are no people matching the current search criteria</p> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
