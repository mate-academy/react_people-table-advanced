import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person, SortField, SortOrder } from '../types';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';

const sortableFields: SortField[] = ['name', 'sex', 'born', 'died'];
const availableCenturies = [16, 17, 18, 19, 20];

const getCentury = (year: number) => Math.ceil(year / 100);

const preparePeople = (people: Person[]): Person[] => {
  const peopleByName = new Map(people.map(person => [person.name, person]));

  return people.map(person => ({
    ...person,
    mother: person.motherName
      ? peopleByName.get(person.motherName)
      : undefined,
    father: person.fatherName
      ? peopleByName.get(person.fatherName)
      : undefined,
  }));
};

export const PeoplePage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(loadedPeople => {
        setPeople(preparePeople(loadedPeople));
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const query = searchParams.get('query') || '';
  const sexParam = searchParams.get('sex');
  const sex = sexParam === 'm' || sexParam === 'f' ? sexParam : null;
  const selectedCenturies = searchParams
    .getAll('centuries')
    .map(Number)
    .filter(century => availableCenturies.includes(century));
  const sortParam = searchParams.get('sort');
  const sortField = sortableFields.includes(sortParam as SortField)
    ? (sortParam as SortField)
    : null;
  const sortOrder: SortOrder =
    sortField && searchParams.get('order') === 'desc' ? 'desc' : 'asc';
  const normalizedQuery = query.toLowerCase();

  const visiblePeople = people.filter(person => {
    const matchesSex = sex ? person.sex === sex : true;
    const matchesCentury = selectedCenturies.length
      ? selectedCenturies.includes(getCentury(person.born))
      : true;
    const matchesQuery = [
      person.name,
      person.motherName || '',
      person.fatherName || '',
    ].some(value => value.toLowerCase().includes(normalizedQuery));

    return matchesSex && matchesCentury && matchesQuery;
  });

  if (sortField) {
    visiblePeople.sort((personA, personB) => {
      const valueA = personA[sortField];
      const valueB = personB[sortField];
      const comparison =
        typeof valueA === 'string'
          ? valueA.localeCompare(valueB as string)
          : valueA - (valueB as number);

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  const hasPeople = people.length > 0;
  const hasNoMatches = hasPeople && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {hasPeople && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && !hasPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {hasNoMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {hasPeople && visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  selectedSlug={slug}
                  sortField={sortField}
                  sortOrder={sortOrder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
