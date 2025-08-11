/* eslint-disable max-len */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import React, { useEffect, useState } from 'react';
import * as peopleFromApi from '../api';

interface PeopleInterface {
  peopleApi: Person[];
  setPeopleApi: React.Dispatch<React.SetStateAction<Person[]>>;
}

export const PeoplePage: React.FC<PeopleInterface> = ({
  peopleApi,
  setPeopleApi,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    peopleFromApi.getPeople().then(data => {
      setPeopleApi(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters setPeopleApi={setPeopleApi} />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading === true ? <Loader /> : ''}

              {/* <p data-cy="peopleLoadingError">Something went wrong</p>

              <p data-cy="noPeopleMessage">There are no people on the server</p>

              // eslint-disable-next-line max-len
              <p>There are no people matching the current search criteria</p> */}

              <PeopleTable peopleApi={peopleApi} setPeopleApi={setPeopleApi} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
