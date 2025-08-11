import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import React, { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [query, setQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSex = searchParams.get('sex') || '';
  const activeQuery = searchParams.get('query') || '';
  const activeCenturies = searchParams.getAll('centuries') || '';

  const toggleCenturies = (currentCentury: number) => {
    const tempCenturies = !activeCenturies.includes(String(currentCentury))
      ? [...activeCenturies, `${currentCentury}`]
      : activeCenturies.filter(century => century !== String(currentCentury));

    return tempCenturies;
  };

  const handleFilterBySex = (sex: string, people: Person[]) => {
    switch (sex) {
      case 'm':
        return people.filter(person => person.sex === activeSex);
      case 'f':
        return people.filter(person => person.sex === activeSex);
      default:
        return people;
    }
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredPeople = peoples.filter(person =>
    person.name.toLowerCase().includes(normalizedQuery),
  );

  const filterByCentury = () => {
    if (activeCenturies.length > 0) {
      return filteredPeople.filter(person =>
        activeCenturies.includes(String(Math.floor(person.born / 100) + 1)),
      );
    } else {
      return filteredPeople;
    }
  };

  const filteredByCentury = filterByCentury();

  const visiblePeoples = handleFilterBySex(activeSex, filteredByCentury);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getPeople()
      .then(fetchedPeoples =>
        fetchedPeoples.map(people => ({
          ...people,
          mother: fetchedPeoples.find(
            mother => mother.name === people.motherName,
          ),

          father: fetchedPeoples.find(
            father => father.name === people.fatherName,
          ),
        })),
      )
      .then(setPeoples)
      .then(() => setShowFilter(true))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showFilter && (
              <PeopleFilters
                searchParams={searchParams}
                toggleCenturies={toggleCenturies}
                setQuery={setQuery}
                activeQuery={activeQuery}
                setSearchParams={setSearchParams}
                activeCenturies={activeCenturies}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!peoples.length && !isError && !isLoading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!visiblePeoples.length && query && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!!visiblePeoples.length && (
                <PeopleTable
                  peoples={visiblePeoples}
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
