import React, { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { PersonType } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<PersonType[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [peopleFilter, setPeopleFilter] = useState<PersonType[] | undefined>(
    undefined,
  );

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
        setPeopleFilter(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const hasPeople = people?.length;
  const hasFiltered = peopleFilter?.length;

  const showError = !loading && !people;
  const showNoPeople = !loading && people && !hasPeople;
  const showNoMatches = !loading && hasPeople && !hasFiltered;
  const showTable = !loading && hasFiltered;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              people={people}
              setPeopleFiltered={setPeopleFilter}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {showError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {showNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showTable && <PeopleTable people={peopleFilter!} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
