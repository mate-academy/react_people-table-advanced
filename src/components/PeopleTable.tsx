/* eslint-disable @typescript-eslint/indent */
import { useCallback, useContext, useEffect, useState } from 'react';
import { PersonLink } from './PersonLink';
import { StatesContext } from '../store/Store';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classname from 'classnames';
import { SearchLink } from './SearchLink';

enum Columns {
  NAME = 'name',
  SEX = 'sex',
  BORN = 'born',
  DIED = 'died',
  MOTHER = 'mother',
  FATHER = 'father',
}

const COLUMNS: {
  [key in Columns]: {
    title: string;
    isSorted: boolean;
    sortingFn?: (a: Person, b: Person) => number;
  };
} = {
  name: {
    title: 'name',
    isSorted: true,
    sortingFn: (a: Person, b: Person) => a.name.localeCompare(b.name),
  },
  sex: {
    title: 'sex',
    isSorted: true,
    sortingFn: (a: Person, b: Person) => b.sex.localeCompare(a.sex),
  },
  born: {
    title: 'born',
    isSorted: true,
    sortingFn: (a: Person, b: Person) => b.born - a.born,
  },
  died: {
    title: 'died',
    isSorted: true,
    sortingFn: (a: Person, b: Person) => b.died - a.died,
  },
  mother: {
    title: 'mother',
    isSorted: false,
  },
  father: {
    title: 'father',
    isSorted: false,
  },
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = () => {
  const { people } = useContext(StatesContext);
  const [visiblePeople, setVisiblePeople] = useState<Person[]>(people);

  const [searchParams] = useSearchParams();
  const sort: Columns | null = (searchParams.get('sort') as Columns) || null;
  const order = searchParams.get('order') !== 'desc';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';
  const [prevCent, setPrevCent] = useState<string[]>([]);

  const findPersonByName = (name: string) => {
    return people.find(person => person.name === name);
  };

  const handleSortChange = useCallback(() => {
    const sortedPeople = [...people];

    const sortingFn = (sort && COLUMNS[sort].sortingFn) ?? (() => 0);
    const finalSorting = (a: Person, b: Person) => {
      const [first, second] = order ? [b, a] : [a, b];

      return sortingFn(first, second);
    };

    return setVisiblePeople(sortedPeople.sort(finalSorting));
  }, [sort, order, people]);

  const handleSexFilterChange = useCallback(() => {
    const filteredPeople = [...people];

    setVisiblePeople(
      sex
        ? filteredPeople.filter(person => person.sex === sex)
        : filteredPeople,
    );
  }, [people, sex]);

  const handleCenturyFilterChange = useCallback(() => {
    if (JSON.stringify(centuries) !== JSON.stringify(prevCent)) {
      const filteredPeople = [...people];

      setVisiblePeople(
        centuries.length
          ? filteredPeople.filter(
              person =>
                centuries.includes(Math.floor(person.born / 100).toString()) ||
                centuries.includes(Math.floor(person.died / 100).toString()),
            )
          : filteredPeople,
      );
      setPrevCent([...centuries]);
    }
  }, [centuries, people, prevCent]);

  const handleQueryFilterChange = useCallback(() => {
    const filteredPeople = [...people];

    setVisiblePeople(
      filteredPeople.filter(person => {
        return (
          person.name.toLowerCase().includes(query.toLowerCase().trim()) ||
          person.fatherName
            ?.toLowerCase()
            .includes(query.toLowerCase().trim()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase().trim())
        );
      }),
    );
  }, [query, people]);

  useEffect(() => {
    handleQueryFilterChange();
  }, [handleQueryFilterChange]);

  useEffect(() => {
    handleCenturyFilterChange();
  }, [handleCenturyFilterChange]);

  useEffect(() => {
    handleSortChange();
  }, [handleSortChange]);

  useEffect(() => {
    handleSexFilterChange();
  }, [handleSexFilterChange]);

  function getSearchLinkParams(sortField: string) {
    return {
      sort: sortField === sort && !order ? null : sortField,
      order: (order && sortField !== sort) || !order ? null : 'desc',
    };
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(COLUMNS).map(column => (
            <th key={column.title}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column.title.charAt(0).toUpperCase() + column.title.slice(1)}
                {column.isSorted && (
                  <SearchLink params={getSearchLinkParams(column.title)}>
                    <span className="icon">
                      <i
                        className={classname('fas', {
                          ['fa-sort']: sort !== column.title,
                          ['fa-sort-up']: sort === column.title && order,
                          ['fa-sort-down']: sort === column.title && !order,
                        })}
                      />
                    </span>
                  </SearchLink>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          return (
            <PersonLink
              findPersonByName={findPersonByName}
              person={person}
              key={person.slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
