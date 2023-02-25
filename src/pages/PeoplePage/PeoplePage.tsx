import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/PeopleTable';

import { getPeople } from '../../api';
import { getPeopleWithParents } from '../../helpers/getPeopleWithParents';
import { filterPeopleBy } from '../../helpers/filterPeopleBy';
import { sortPeopleBy } from '../../helpers/sortPeopleBy';

import { Person } from '../../types/Person';
import { SortBy } from '../../enums/SortBy';
import { SearchParam } from '../../enums/SearchParam';
import { Sex } from '../../enums/Sex';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isWaiting, setIsWaiting] = useState(true);

  const [searchParams] = useSearchParams();

  const selectedCenturies = searchParams.getAll(SearchParam.Centuries) || [];
  const selectedSex = (searchParams.get(SearchParam.Sex) || '') as Sex;
  const enteredQuery = searchParams.get(SearchParam.Query) || '';
  const selectedSort = (searchParams.get(SearchParam.Sort) || '') as SortBy;
  const selectedOrder = searchParams.get(SearchParam.Order) || '';

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        const peopleWithParents = getPeopleWithParents(peopleFromServer);

        setPeople(peopleWithParents);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsWaiting(false));
  }, []);

  const filteredPeople = useMemo(
    () => filterPeopleBy(people, enteredQuery, selectedSex, selectedCenturies),
    [people, enteredQuery, selectedCenturies, selectedSex],
  );

  const visiblePeople = useMemo(
    () => sortPeopleBy(filteredPeople, selectedSort, selectedOrder),
    [filteredPeople, selectedOrder, selectedSort],
  );

  const isDownloaded = !isWaiting && !hasError;
  const isFilteredPeopleEmpty = people.length > 0 && !filteredPeople.length;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isWaiting && <Loader />}

          {!isWaiting && (
            <>
              {isDownloaded && people.length > 0 && (
                <div className="column is-7-tablet is-narrow-desktop">
                  <PeopleFilters />
                </div>
              )}

              <div className="column">
                <div className="box table-container">
                  {hasError && (
                    <p
                      data-cy="peopleLoadingError"
                      className="has-text-danger"
                    >
                      Something went wrong
                    </p>
                  )}

                  {isDownloaded && (
                    <>
                      {people.length === 0 && (
                        <p data-cy="noPeopleMessage">
                          There are no people on the server
                        </p>
                      )}

                      {isFilteredPeopleEmpty && (
                        <p>
                          There are no people matching the current search
                          criteria
                        </p>
                      )}

                      {!isFilteredPeopleEmpty && (
                        <PeopleTable people={visiblePeople} />
                      )}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
