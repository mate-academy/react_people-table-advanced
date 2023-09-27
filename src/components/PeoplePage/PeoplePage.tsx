import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTable';
import { PeopleContext } from '../../contexts/PeopleContext';
import { PeopleFilters } from '../PeopleFilters';

export const PeoplePage: React.FC = () => {
  const { people, setPeople } = useContext(PeopleContext);
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);

  const isShowLoad = isLoad && !isError && !people.length;
  const isShowError = !isLoad && isError && !people.length;
  const isShowNoPeople = !isLoad && !isError && !people.length;
  const isShowPeople = !isLoad && !isError && !!people.length;

  useEffect(() => {
    setIsError(false);
    setIsLoad(true);

    (async () => {
      try {
        setPeople(await getPeople());
      } catch {
        setIsError(true);
      } finally {
        setIsLoad(false);
      }
    })();

    return () => setPeople([]);
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isShowPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {isShowLoad && <Loader />}

              {isShowError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isShowNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isShowPeople && <PeopleTable people={people} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
