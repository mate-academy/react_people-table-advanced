import { useEffect, useState } from 'react';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
// eslint-disable-next-line import/extensions
import { PeoplePageTitle } from '../page/PeoplePageTitle';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '../enum/queryParams.enum';
import { Sex } from '../enum/sex.enum';

export const PeoplePage = () => {
  // #region states
  const [loading, setLoading] = useState(true);
  const [fetchPeopleError, setFetchPeopleError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  // #endregion

  const [searchParams, setSearchParams] = useSearchParams();

  const activeCenturies = searchParams.getAll(QueryParams.Centuries) || [];
  const activeSex = searchParams.get(QueryParams.Sex) as Sex || '';
  const activeQuery = searchParams.get(QueryParams.Query) || '';

  const toggleCenturies = (currentCentury: number) => {
    const tempCenturies = !activeCenturies.includes(String(currentCentury))
      ? [...activeCenturies, `${currentCentury}`]
      : activeCenturies.filter(century => century !== String(currentCentury));

    return tempCenturies;
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(normalizedQuery),
  );

  const filterByCentury = () => {
    if (activeCenturies.length) {
      return filteredPeople.filter(person =>
        activeCenturies.includes(String(Math.floor(person.born / 100) + 1)),
      );
    } else {
      return filteredPeople;
    }
  };

  const handleFilterBySex = (peopleList: Person[], activeSex: Sex) => {
    switch (activeSex) {
      case Sex.Male:
        return peopleList.filter(person => person.sex === Sex.Male);
      case Sex.Female:
        return peopleList.filter(person => person.sex === Sex.Female);
      default:
        return peopleList;
    }
  };

  const filteredByCentury = filterByCentury();
  const visiblePeople = handleFilterBySex(filteredByCentury, activeSex as Sex);

  // Define the fetchPeople function outside of useEffect
  const fetchPeople = async () => {
    setFetchPeopleError(false);

    try {
      const response = await getPeople();
      setPeople(response);
      setShowFilters(true);
    } catch (error) {
      setFetchPeopleError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  // #region conditions
  const fetchingErrorNotification = !loading && fetchPeopleError;
  const noPeopleNotification = !loading && !fetchPeopleError && !people.length;
  const showPeopleTable = !loading && !fetchPeopleError && !!people.length;
  const noVisiblePeopleByCriteria = !visiblePeople.length;
  // #endregion

  return (
    <>
      <PeoplePageTitle />

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {showFilters && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                toggleCenturies={toggleCenturies}
                searchParams={searchParams}
                setQuery={setQuery}
                activeQuery={activeQuery}
                setSearchParams={setSearchParams}
                activeCenturies={activeCenturies}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {fetchingErrorNotification && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {noPeopleNotification && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noVisiblePeopleByCriteria && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showPeopleTable && (
                <PeopleTable
                  people={visiblePeople}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
