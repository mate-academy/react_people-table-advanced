import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
  selectedPersonSlug?: string | null;
  onSelect?: (slug: string) => void;
};

const compareValues = <T,>(a: T, b: T): number => {
  if (a == null && b == null) {
    return 0;
  }

  if (a == null) {
    return -1;
  }

  if (b == null) {
    return 1;
  }

  if (!isNaN(Number(a)) && !isNaN(Number(b))) {
    return Number(a) - Number(b);
  }

  return String(a).localeCompare(String(b), undefined, { sensitivity: 'base' });
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
  onSelect,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order');

  const visiblePeople = people
    .filter(person => {
      const q = query.trim();

      const inName = person.name.toLowerCase().includes(q);
      const inMother = person.motherName?.toLowerCase().includes(q) ?? false;
      const inFather = person.fatherName?.toLowerCase().includes(q) ?? false;

      const matchesQuery = !q || inName || inMother || inFather;
      const matchesSex = !sex || person.sex === sex;
      const matchesCentury =
        centuries.length === 0 ||
        centuries.includes(String(Math.ceil(person.born / 100)));

      return matchesQuery && matchesSex && matchesCentury;
    })
    .slice()
    .sort((a, b) => {
      if (!sortBy) {
        return 0;
      }

      const key = sortBy as keyof Person;
      const cmp = compareValues(a[key], b[key]);

      return order === 'desc' ? -cmp : cmp;
    });

  function toggleSort(field: string) {
    if (sortBy !== field) {
      setSearchParams(
        getSearchWith(searchParams, { sort: field, order: null }),
      );
    } else if (order !== 'desc') {
      setSearchParams(
        getSearchWith(searchParams, { sort: field, order: 'desc' }),
      );
    } else {
      setSearchParams(getSearchWith(searchParams, { sort: null, order: null }));
    }
  }

  const renderSortableTh = (field: string, label: string) => {
    const isActive = sortBy === field;
    const isDesc = isActive && order === 'desc';

    return (
      <th
        key={field}
        data-cy={`th-${field}`}
        className="is-clickable has-text-weight-bold"
        onClick={() => toggleSort(field)}
        style={{
          userSelect: 'none',
        }}
      >
        <span>{label}</span>
        <span className="icon is-small ml-1">
          {!isActive && <i className="fas fa-sort" style={{ color: '#ccc' }} />}

          {isActive && !isDesc && (
            <i className="fas fa-sort-up" style={{ color: 'blue' }} />
          )}

          {isActive && isDesc && (
            <i className="fas fa-sort-down" style={{ color: 'blue' }} />
          )}
        </span>
      </th>
    );
  };

  if (visiblePeople.length === 0) {
    return (
      <p className="has-text-centered" data-cy="noResults">
        There are no people matching the current search criteria
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {renderSortableTh('name', 'Name')}
          {renderSortableTh('sex', 'Sex')}
          {renderSortableTh('born', 'Born')}
          {renderSortableTh('died', 'Died')}
          <th className="has-text-weight-bold">Mother</th>
          <th className="has-text-weight-bold">Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map(person => {
          const mother = people.find(p => p.name === person.motherName) || null;
          const father = people.find(p => p.name === person.fatherName) || null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === selectedPersonSlug,
              })}
              onClick={() => onSelect?.(person.slug)}
            >
              <td>
                <SearchLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <SearchLink person={mother} fallbackName={person.motherName} />
              </td>
              <td>
                <SearchLink person={father} fallbackName={person.fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
