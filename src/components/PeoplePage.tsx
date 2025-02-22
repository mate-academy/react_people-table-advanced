import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { PeoplePageTitle } from '../page/PeoplePageTitle';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import { QueryParams } from '../enum/queryParams.enum';
import { Sex } from '../enum/sex.enum';

export const PeoplePage = () => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeCenturies = searchParams.getAll(QueryParams.Centuries) || [];
  const activeSex = (searchParams.get(QueryParams.Sex) as Sex) || '';
  const activeQuery = searchParams.get(QueryParams.Query) || '';

  const toggleCenturies = (currentCentury: number) => {
    const updatedCenturies = !activeCenturies.includes(String(currentCentury))
      ? [...activeCenturies, `${currentCentury}`]
      : activeCenturies.filter(century => century !== String(currentCentury));

    return updatedCenturies;
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredPeopleByName = people.filter(person =>
    person.name.toLowerCase().includes(normalizedQuery),
  );

  const filterByCentury = () => {
    if (activeCenturies.length) {
      return filteredPeopleByName.filter(person =>
        activeCenturies.includes(String(Math.floor(person.born / 100) + 1)),
      );
    }
    return filteredPeopleByName;
  };

  const filterBySex = (peopleList: Person[]) => {
    if (!activeSex) return peopleList;
    return peopleList.filter(person => person.sex === activeSex);
  };

  const filteredPeople = filterByCentury();
  const visiblePeople = filterBySex(filteredPeople);

  const fetchPeople = async () => {
    setHasError(false);
    setInitialLoadDone(false);

    try {
      const response = await getPeople();
      setPeople(response);
      setShowFilters(true);
    } catch (error) {
      setHasError(true);
    } finally {
      setLoading(false);
      setInitialLoadDone(true);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const showErrorNotification = hasError;
  const showNoPeopleMessage = !loading && !hasError && !people.length && initialLoadDone;
  const showTable = !loading && !hasError && !!people.length;
  const showNoVisiblePeopleMessage = !loading && !visiblePeople.length && initialLoadDone;

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

              {showErrorNotification && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {showNoPeopleMessage && (
                <p data-cy="noPeopleMessage">There are no people on the server</p>
              )}

              {showNoVisiblePeopleMessage && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showTable && (
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
