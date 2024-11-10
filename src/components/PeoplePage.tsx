import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useLocation, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const sex = searchParam.get('sex') || '';
  const nameSearch = searchParam.get('name') || '';
  const centuries = searchParam.getAll('centuries') || [];
  const sort = searchParam.get('sort') || '';

  const [peopleData, setPeopleData] = useState<Person[] | null>(null);
  const [loader, setLoader] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setLoader(true);
    getPeople()
      .then(db => {
        setPeopleData(db);
      })
      .catch(() => {
        setShowError(true);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loader && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters centuries={centuries} sex={sex} />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loader && <Loader />}

              {showError && <p data-cy="peopleLoadingError">Something went wrong</p>}

              {/* Show message if there are no people */}
              {!loader && peopleData && peopleData.length === 0 && (
                <p data-cy="noPeopleMessage">There are no people on the server</p>
              )}

              {!loader && peopleData && peopleData.length > 0 && (
                <PeopleTable
                  centuries={centuries}
                  peopleData={peopleData}
                  sex={sex}
                  nameSearch={nameSearch}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
