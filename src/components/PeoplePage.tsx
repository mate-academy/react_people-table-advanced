import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { getPeople } from '../api';
import PeopleTable from './PeopleTable';
import { useSearchParams } from 'react-router-dom';

function fillByParents(persons: Person[]): Person[] {
  return persons.map(person => {
    return {
      ...person,
      father: persons.find(p => p.name === person.fatherName),
      mother: persons.find(p => p.name === person.motherName),
    };
  });
}

function filterPeople(
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
): Person[] {
  let filtered = [...people];

  // Filter by sex
  if (sex) {
    filtered = filtered.filter(person => person.sex === sex);
  }

  // Filter by query (search in name, motherName, fatherName)
  if (query) {
    const lowerQuery = query.toLowerCase();

    filtered = filtered.filter(
      person =>
        person.name.toLowerCase().includes(lowerQuery) ||
        person.motherName?.toLowerCase().includes(lowerQuery) ||
        person.fatherName?.toLowerCase().includes(lowerQuery),
    );
  }

  // Filter by centuries
  if (centuries.length > 0) {
    filtered = filtered.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(String(century));
    });
  }

  return filtered;
}

function sortPeople(
  people: Person[],
  sortField: string | null,
  order: string | null,
): Person[] {
  if (!sortField) {
    return people;
  }

  const sorted = [...people];

  sorted.sort((a, b) => {
    const aValue = a[sortField as keyof Person];
    const bValue = b[sortField as keyof Person];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue;
    }

    return 0;
  });

  if (order === 'desc') {
    sorted.reverse();
  }

  return sorted;
}

export const PeoplePage = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(data => {
        const fillData = fillByParents(data);

        setPersons(fillData);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Get search params
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const order = searchParams.get('order');

  // Apply filters and sorting
  const visiblePeople = sortPeople(
    filterPeople(persons, sex, query, centuries),
    sortField,
    order,
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading ? (
                <Loader />
              ) : isError ? (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              ) : visiblePeople.length === 0 ? (
                <p data-cy="noPeopleMessage">
                  There are no people matching the current search criteria
                </p>
              ) : (
                <PeopleTable persons={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
