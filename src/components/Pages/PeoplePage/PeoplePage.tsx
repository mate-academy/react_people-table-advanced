import { useMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PeopleTable } from '../../PeopleTable';
import { getPeople } from '../../../api';
import { Loader } from '../../Loader';
import { Person } from '../../../types';

import { PeopleFilters } from '../../../PeopleFilters';

export const PeoplePage = () => {
  const math = useMatch('/people/:personId');
  const peopleId = math?.params.personId || '';

  const [peoples, setPeoples] = useState<Person[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadPeoplesData = async () => {
    try {
      setIsLoader(true);
      const peoplesData = await getPeople();

      setPeoples(peoplesData);
    } catch {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    loadPeoplesData();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block flex">
        <div className="box table-container" style={{ width: '100%' }}>
          {isError ? (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          ) : (
            <PeopleTable personId={peopleId} peoples={peoples} />
          )}

          {isLoader ? (
            <Loader />
          ) : (
            <>
              {!peoples.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </>
          )}
        </div>

        {!isLoader && (
          <PeopleFilters />
        )}
      </div>
    </>
  );
};
