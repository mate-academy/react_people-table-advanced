import { useEffect, useState } from 'react';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeoplePageTitle } from '../pages/PeoplePageTitle';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { GenderKey, genderKeyFemale, genderKeyMale } from '../types/FilterBy';

export const PeoplePage = () => {
  //#region states
  const [loading, setLoading] = useState(true);
  const [fetchPeopleError, setFetchPeopleError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  //#endregion

  const [searchParams, setSearchParams] = useSearchParams();

  const activeCenturies = searchParams.getAll('centuries') || '';
  const activeSex = (searchParams.get('sex') || '') as GenderKey | '';
  const activeQuery = searchParams.get('query') || '';

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

  const handleFilterBySex = (sex: string, peopleList: Person[]) => {
    if (sex === genderKeyMale || sex === genderKeyFemale) {
      return peopleList.filter(person => person.sex === sex);
    } else {
      return peopleList;
    }
  };

  const filteredByCentury = filterByCentury();
  const visiblePeople = handleFilterBySex(activeSex, filteredByCentury);

  useEffect(() => {
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

    fetchPeople();
  }, []);

  //#region conditions
  const fetchingErrorNotification = !loading && fetchPeopleError;
  const noPeopleNotification = !loading && !fetchPeopleError && !people.length;
  const noVisiblePeopleByCriteria = !visiblePeople.length;
  const showPeopleTable =
    !loading &&
    !fetchPeopleError &&
    !!people.length &&
    !noVisiblePeopleByCriteria;
  //#endregion

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

              {noVisiblePeopleByCriteria && !loading && (
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
