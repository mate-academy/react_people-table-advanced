import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable } from '../components/PeopleTable';

type Query = string;
type Centuries = number[];

type FilterBy = {
  sex: string,
  query: Query,
  centuries: Centuries,
};

type SortBy = 'Name' | 'Sex' | 'Born' | 'Died';

const comparePersons = (person1: Person, person2: Person, sortBy: SortBy) => {
  switch (sortBy) {
    case 'Name':
      return person1.name.localeCompare(person2.name);
    case 'Sex':
      return person1.sex.localeCompare(person2.sex);
    case 'Born':
      return person1.born - person2.born;
    case 'Died':
      return person1.died - person2.died;

    default:
      return 0;
  }
};

function yearToCentury(year: number):number {
  const firstCh = Number(String(year).slice(0, -2));

  return year % 100 === 0
    ? firstCh
    : firstCh + 1;
}

function getFilteredPersons(
  persons: Person[],
  { sex, query, centuries }: FilterBy,
):Person[] {
  const includeQuery = (name: string) => (
    name.toLowerCase().includes(query.toLowerCase())
  );

  const bySex = sex
    ? persons.filter(person => person.sex === sex)
    : persons;

  const byName = query
    ? bySex.filter(({ name, motherName, fatherName }) => (
      includeQuery(name)
      || includeQuery(motherName ?? '')
      || includeQuery(fatherName ?? '')
    ))
    : bySex;

  const byCenturies = centuries.length > 0
    ? byName.filter(({ born, died }) => (
      centuries.includes(yearToCentury(born))
      || centuries.includes(yearToCentury(died))
    ))
    : byName;

  return byCenturies;
}

export const PeoplePage: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') ?? '';
  const query = searchParams.get('query') ?? '';
  const centuries = searchParams
    .getAll('centuries')
    .map(c => Number(c)) ?? [];

  const sort = searchParams.get('sort') ?? '';
  const order = searchParams.get('order') ?? '';

  const filtered = useMemo(() => {
    return getFilteredPersons(persons, { sex, query, centuries });
  }, [persons, sex, query, centuries]);

  const sorted = useMemo(() => {
    return [...filtered].sort((person1, person2) => (
      comparePersons(person1, person2, sort as SortBy)
    ));
  }, [filtered, sort]);

  const visiblePersons = useMemo(() => {
    return order === 'desc'
      ? [...sorted].reverse()
      : sorted;
  }, [sorted, order]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople
      .then(data => setPersons(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {persons.length > 0 && (
              <PeopleFilters />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p
                  data-cy="peopleLoadingError"
                  className="has-text-danger"
                >
                  Something went wrong
                </p>
              )}

              {!isError && !isLoading && persons.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {persons.length > 0 && (
                <PeopleTable
                  persons={visiblePersons}
                  selected={slug ?? '-'}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
