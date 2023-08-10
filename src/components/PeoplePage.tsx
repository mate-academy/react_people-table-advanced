import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { Column } from '../types/Column';

function findPerson(
  people: Person[], personName: string | null,
): Person | undefined {
  return people.find(person => person.name === personName);
}

interface FilterParams {
  query: string;
  sort: Column;
  order: string
  sex: string;
  centuries: string[];
}

function getFilteredPeople(
  people: Person[],
  {
    query,
    sort,
    order,
    sex,
    centuries,
  }: FilterParams,
) {
  let visiblePeople = [...people];

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    visiblePeople = visiblePeople.filter(
      person => person.name.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(
      person => person.sex === sex,
    );
  }

  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(
      person => centuries.includes(
        Math.ceil(person.born / 100).toString(),
      ),
    );
  }

  if (sort) {
    visiblePeople.sort((person1, person2) => {
      switch (sort) {
        case Column.NAME:
          return person1.name.localeCompare(person2.name);

        case Column.SEX:
          return person1.sex.localeCompare(person2.sex);

        case Column.BORN:
          return person1.born - person2.born;

        case Column.DIED:
          return person1.died - person2.died;

        default:
          return 0;
      }
    });
  }

  if (order === 'desc') {
    visiblePeople.reverse();
  }

  return visiblePeople;
}

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const sort = searchParams.get('sort') as Column;
  const order = searchParams.get('order') || '';

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then((allPeople) => allPeople.map(person => ({
        ...person,
        mother: findPerson(allPeople, person.motherName),
        father: findPerson(allPeople, person.fatherName),
      })))
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const visiblePeople = useMemo(
    () => getFilteredPeople(
      people,
      {
        query, sort, order, sex, centuries,
      },
    ), [people, query, sort, order, sex, centuries],
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && visiblePeople.length === 0 && !error && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && people.length === 0 && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !error && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
