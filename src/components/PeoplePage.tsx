import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useContext, useEffect, useState } from 'react';
import { getPeople } from '../api';
import { PeopleContext } from '../context/PeopleContext';

type Status = 'loading' | 'success' | 'empty' | 'error';

export const PeoplePage = () => {
  const [status, setStatus] = useState<Status>('loading');
  const { setPeople } = useContext(PeopleContext);

  useEffect(() => {
    setStatus('loading');

    getPeople()
      .then(data => {
        setPeople(data);
        setStatus(data.length === 0 ? 'empty' : 'success');
      })
      .catch(() => {
        setStatus('error');
      });
  }, [setPeople]);

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
              {status === 'loading' && <Loader />}

              {status === 'error' && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {status === 'empty' && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/*<p>There are no people matching the current search criteria</p>*/}

              {status === 'success' && <PeopleTable />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
