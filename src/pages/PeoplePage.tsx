import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../types';
import { ErrorNames } from '../types/ErrorNames';
import { Sex } from '../types/Sex';
import { SortOrder } from '../types/SortOrder';
import { SortType } from '../types/SortType';

import { getPeople } from '../api';
import { getSearchWith } from '../utils/searchHelper';
import { filterPeople } from '../utils/filterPeople';
import { sortPeople } from '../utils/sortPeople';

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { SearchParams } from '../types/SearchParams';

export const PeoplePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(ErrorNames.None);

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(peopleFromServer => setPeople(peopleFromServer))
      .catch(() => setHasError(ErrorNames.Unknown))
      .finally(() => setLoading(false));
  }, []);

  const sex = searchParams.get(SearchParams.Sex) || Sex.None;
  const query = searchParams.get(SearchParams.Query) || '';
  const centuries = searchParams.getAll(SearchParams.Centuries) || [];
  const sortType = searchParams.get(SearchParams.Sort) || null;
  const isReversed = searchParams.get(SearchParams.Order) === SortOrder.Desc;

  const handleSexChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    getSearchWith(searchParams, { sex: event.currentTarget.innerText });
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(searchParams, { query: event.target.value }));
  };

  const toggleCenturies = (character: string) => {
    const newCenturies = centuries.includes(character)
      ? centuries.filter(century => century !== character)
      : [...centuries, character];

    getSearchWith(searchParams, { centuries: newCenturies });
  };

  const filteredPeople = filterPeople(
    people,
    sex as Sex,
    query,
    centuries,
  );

  const sortedPeople = sortPeople(
    filteredPeople,
    sortType as SortType,
    isReversed,
  );

  return (
    <>
      <h1 className="title">
        People Page
      </h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && people.length > 0
              && hasError === ErrorNames.None && (
              <PeopleFilters
                sex={sex as Sex}
                handleSexChange={handleSexChange}
                query={query}
                handleQueryChange={handleQueryChange}
                centuries={centuries}
                toggleCenturies={toggleCenturies}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {hasError !== ErrorNames.None && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )}

                  {people.length === 0
                    && hasError === ErrorNames.None && (
                    <p data-cy="noPeopleMessage">
                      {ErrorNames.NoPeopleFromServer}
                    </p>
                  )}

                  {people.length > 0
                    && hasError === ErrorNames.None && (
                    <PeopleTable
                      people={sortedPeople}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
