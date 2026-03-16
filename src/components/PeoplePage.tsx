import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types/Person';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

type SortField = 'name' | 'sex' | 'born' | 'died';

const sortFields: SortField[] = ['name', 'sex', 'born', 'died'];

const isSortField = (value: string): value is SortField => {
  return sortFields.includes(value as SortField);
};

const matchesQuery = (value: string | null, normalizedQuery: string) => {
  if (!value) {
    return false;
  }

  return value.toLowerCase().includes(normalizedQuery);
};

export const PeoplePage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setHasError(false);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const normalizedQuery = query.toLowerCase();

  const visiblePeople = people.filter(person => {
    const matchesPersonQuery =
      !normalizedQuery ||
      matchesQuery(person.name, normalizedQuery) ||
      matchesQuery(person.motherName, normalizedQuery) ||
      matchesQuery(person.fatherName, normalizedQuery);

    const matchesSex = !sex || person.sex === sex;

    const personCentury = Math.ceil(person.born / 100).toString();
    const matchesCentury =
      centuries.length === 0 || centuries.includes(personCentury);

    return matchesPersonQuery && matchesSex && matchesCentury;
  });

  const sortedPeople = [...visiblePeople].sort((person1, person2) => {
    if (!isSortField(sort)) {
      return 0;
    }

    let result = 0;

    switch (sort) {
      case 'name':
        result = person1.name.localeCompare(person2.name);
        break;

      case 'sex':
        result = person1.sex.localeCompare(person2.sex);
        break;

      case 'born':
        result = person1.born - person2.born;
        break;

      case 'died':
        result = person1.died - person2.died;
        break;
    }

    return order === 'desc' ? -result : result;
  });

  const hasPeople = people.length > 0;
  const hasVisiblePeople = visiblePeople.length > 0;

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
              {loading && <Loader />}

              {hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading && !hasError && !hasPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!loading && !hasError && hasPeople && !hasVisiblePeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!loading && !hasError && hasVisiblePeople && (
                <PeopleTable people={sortedPeople} selectedSlug={slug} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
