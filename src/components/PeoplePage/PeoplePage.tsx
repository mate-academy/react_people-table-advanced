import { PeopleFilters } from '../PeapleFilter/PeopleFilters';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../../api';

function getPreperedPeople(
  filterField: string,
  query: string,
  centuries: string[],
  sort: string,
  sortOrder: string,
  people: Person[],
) {
  let visiblePeople = [...people];

  const preperedQuery = query.trim().toLowerCase();

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

  if (sort) {
    visiblePeople.sort((a: Person, b: Person) => {
      switch (sort) {
        case 'name':
        case 'sex':
          if (sortOrder === 'asc') {
            return a[sort].localeCompare(b[sort]);
          } else if (sortOrder === 'desc') {
            return b[sort].localeCompare(a[sort]);
          } else {
            return 0;
          }

        case 'born':
        case 'died':
          if (sortOrder === 'asc') {
            return a[sort] - b[sort];
          } else if (sortOrder === 'desc') {
            return b[sort] - a[sort];
          } else {
            return 0;
          }

        default:
          return 0;
      }
    });
  }

  if (filterField && filterField !== 'all') {
    return visiblePeople.filter(person => person.sex === filterField);
  } else {
    return visiblePeople;
  }
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();

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
  const filterField = searchParams.get('filterField') || 'all';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('sortOrder') || '';

  const visiblePeople = getPreperedPeople(
    filterField,
    query,
    centuries,
    sort,
    sortOrder,
    readyPeople,
  );

  const selectedPerson = visiblePeople.find(person => person.slug === slug);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              filterField={filterField}
              query={query}
              centuries={centuries}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !isError && readyPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && visiblePeople.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && (
                <PeopleTable
                  people={visiblePeople}
                  selectedPerson={selectedPerson}
                  sortOrder={sortOrder}
                  searchParams={searchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
