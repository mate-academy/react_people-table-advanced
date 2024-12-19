/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { PeopleContext } from '../../Context';
import { PeopleFilters } from '../PeopleFilters';
import { getPeople } from '../../api';

//<p>There are no people matching the current search criteria</p>

export const PeoplePage: React.FC = () => {
  // #region context

  const {
    people,
    loader,
    loadingError,
    setLoader,
    setPeople,
    setLoadingError,
  } = useContext(PeopleContext);

  // #endregion
  // #region useEffects

  useEffect(() => {
    setLoader(true);

    getPeople()
      .then(result => setPeople(result))
      .catch(() => setLoadingError(true))
      .finally(() => setLoader(false));
  }, []);

  // #endregion
  // #region markups

  const tableMarkup = (
    <>
      {people.length === 0 && !loader ? (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      ) : (
        <PeopleTable />
      )}
    </>
  );

  const peopleMarkup = (
    <>
      {loadingError ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : (
        tableMarkup
      )}
    </>
  );

  // #endregion

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {loader ? (
            <Loader />
          ) : (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>
              <div className="column">
                <div className="box table-container">{peopleMarkup}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
