import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Person, Sex, SortPersonKey } from '../types';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sexFilter = (searchParams.get('sex') as Sex) || Sex.All;
  const selectedCenturies = searchParams.getAll('centuries') || [];
  const sortPeopleBy = searchParams.get('sort') as SortPersonKey | null;
  const orderPeopleBy = searchParams.get('order');

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    getPeople()
      .then(data => {
        const peopleWithRelations = data.map(person => ({
          ...person,
          mother: data.find(parent => parent.name === person.motherName),
          father: data.find(parent => parent.name === person.fatherName),
        }));

        setPeople(peopleWithRelations);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = people
    .filter(person => {
      const personCetury = Math.ceil(person.born / 100);

      const matchesQuery =
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        (person.fatherName || '').toLowerCase().includes(query.toLowerCase()) ||
        (person.motherName || '').toLowerCase().includes(query.toLowerCase());

      const matchesSex =
        sexFilter === Sex.All ||
        person.sex === sexFilter.toLowerCase().slice(0, 1);

      const matchesCentury =
        selectedCenturies.length === 0 ||
        selectedCenturies.includes(personCetury.toString());

      return matchesQuery && matchesSex && matchesCentury;
    })
    .sort((param1: Person, param2: Person) => {
      if (!sortPeopleBy) {
        return 0;
      }

      const order = orderPeopleBy === 'desc' ? -1 : 1;
      const value1 = param1[sortPeopleBy];
      const value2 = param2[sortPeopleBy];

      if (typeof value1 === 'string' && typeof value2 === 'string') {
        return value1.localeCompare(value2) * order;
      }

      if (typeof value1 === 'number' && typeof value2 === 'number') {
        return (value1 - value2) * order;
      }

      return 0;
    });

  const hasNoPeopleFromServer = !isLoading && !isError && people.length === 0;
  const showNoMatchMessage =
    !isLoading && !isError && visiblePeople.length === 0;

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !isError && people.length > 0 && (
              <PeopleFilters
                selectedCenturies={selectedCenturies}
                query={query}
                handleQueryChange={handleQueryChange}
                sexFilter={sexFilter}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {hasNoPeopleFromServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoMatchMessage && (
                <p>There are no people matching the current search criteria</p>
              )}

              {visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  sortPeopleBy={sortPeopleBy}
                  orderPeopleBy={orderPeopleBy}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
