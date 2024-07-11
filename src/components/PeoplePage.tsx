import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';

function preperedPeople(
  query: string,
  filterField: string,
  centuries: string[],
  sortField: string,
  sortOrder: string,
  readyPeople: Person[],
) {
  let visiblePeople = [...readyPeople];
  const preperedQuery = query.trim().toLowerCase();

  if (sortField) {
    visiblePeople.sort((a: Person, b: Person) => {
      switch (sortField) {
        case 'name':
          if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
          } else if (sortOrder === 'desc') {
            return b.name.localeCompare(a.name);
          } else {
            return 0;
          }

        case 'sex':
          if (sortOrder === 'asc') {
            return b.sex.localeCompare(a.sex);
          } else if (sortOrder === 'desc') {
            return a.sex.localeCompare(b.sex);
          } else {
            return 0;
          }

        case 'born':
          if (sortOrder === 'asc') {
            return a.born - b.born;
          } else if (sortOrder === 'desc') {
            return b.born - a.born;
          } else {
            return 0;
          }

        case 'died':
          if (sortOrder === 'asc') {
            return a.died - b.died;
          } else if (sortOrder === 'desc') {
            return b.died - a.died;
          } else {
            return 0;
          }

        default:
          return 0;
      }
    });
  }

  visiblePeople = visiblePeople.filter(
    person =>
      person.name.toLowerCase().includes(preperedQuery) ||
      person.motherName?.toLowerCase().includes(preperedQuery) ||
      person.fatherName?.toLowerCase().includes(preperedQuery),
  );

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  switch (filterField) {
    case 'all':
      return visiblePeople;
    case 'm':
      return visiblePeople.filter(person => person.sex === 'm');
    case 'f':
      return visiblePeople.filter(person => person.sex === 'f');
    default:
      return visiblePeople;
  }
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();
  const selectedPerson = people.find(person => person.slug === slug);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const readyPeople: Person[] = people.map(person => ({
    ...person,
    mother: people.find(p => p.name === person.motherName),
    father: people.find(p => p.name === person.fatherName),
  }));

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const filterField = searchParams.get('filterField') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sortField = searchParams.get('sort') || '';
  const initialSortOrder = searchParams.get('sortOrder') || '';
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const visiblePeople = preperedPeople(
    query,
    filterField,
    centuries,
    sortField,
    sortOrder,
    readyPeople,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              query={query}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && people.length < 1 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {false && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && (
                <PeopleTable
                  people={visiblePeople}
                  selectedPerson={selectedPerson}
                  searchParams={searchParams}
                  setSearchParams={setSearchParams}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
