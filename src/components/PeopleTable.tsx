import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { useEffect, useState } from 'react';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  visiblePeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ visiblePeople }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedPeople, setSortedPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSortParam = (): {
    key: keyof Person;
    order: 'asc' | 'desc' | 'none';
  } => {
    const key = (searchParams.get('sort') as keyof Person) || 'name';
    const order =
      (searchParams.get('order') as 'asc' | 'desc' | 'none') || 'none';

    return { key, order };
  };

  const updateSortParam = (
    key: keyof Person,
    order: 'asc' | 'desc' | 'none',
  ) => {
    setSearchParams({ sort: key, order });
  };

  useEffect(() => {
    const { key, order } = getSortParam();

    const sorted = [...visiblePeople].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];

      if (order === 'none') {
        return 0;
      }

      if (valueA == null || valueB == null) {
        return 0;
      }

      if (valueA < valueB) {
        return order === 'asc' ? -1 : 1;
      }

      if (valueA > valueB) {
        return order === 'asc' ? 1 : -1;
      }

      return 0;
    });

    setSortedPeople(sorted);
  }, [visiblePeople, searchParams, getSortParam]);

  const getSortIconClass = (column: keyof Person) => {
    const { key, order } = getSortParam();

    if (key !== column) {
      return 'fas fa-sort';
    }

    switch (order) {
      case 'asc':
        return 'fas fa-sort-up';
      case 'desc':
        return 'fas fa-sort-down';
      default:
        return 'fas fa-sort';
    }
  };

  const handleSortClick = (column: keyof Person) => {
    const { key, order } = getSortParam();

    if (key === column) {
      const newOrder =
        order === 'asc' ? 'desc' : order === 'desc' ? 'none' : 'asc';

      updateSortParam(column, newOrder);
    } else {
      updateSortParam(column, 'asc');
    }
  };

  const getHighlightedName = (name: string | null) => {
    const person = sortedPeople.find(bro => bro.name === name);

    if (!person) {
      return name || '-';
    }

    return (
      <a
        className={`has-text-${person.sex === 'f' ? 'danger' : 'info'}`}
        href={`#/people/${person.slug}`}
      >
        {name}
      </a>
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filterPeople = () => {
    const sexFilter = searchParams.get('sex');
    const nameFilter = searchParams.get('name')?.toLowerCase() || '';
    const centuriesFilter = searchParams.getAll('centuries');

    return visiblePeople.filter(person => {
      if (sexFilter && person.sex !== sexFilter) {
        return false;
      }

      if (nameFilter && !person.name.toLowerCase().includes(nameFilter)) {
        return false;
      }

      if (centuriesFilter.length > 0) {
        const personCentury = Math.ceil(person.born / 100);

        if (!centuriesFilter.includes(personCentury.toString())) {
          return false;
        }
      }

      return true;
    });
  };

  useEffect(() => {
    setFilteredPeople(filterPeople());
  }, [visiblePeople, searchParams, filterPeople]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSortClick('name');
                }}
              >
                <span className="icon">
                  <i className={getSortIconClass('name')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSortClick('sex');
                }}
              >
                <span className="icon">
                  <i className={getSortIconClass('sex')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSortClick('born');
                }}
              >
                <span className="icon">
                  <i className={getSortIconClass('born')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSortClick('died');
                }}
              >
                <span className="icon">
                  <i className={getSortIconClass('died')} />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map((person: Person) => (
          <tr key={person.slug} data-cy="person">
            <td>
              <a
                className={`has-text-${person.sex === 'f' ? 'danger' : 'info'}`}
                href={`#/people/${person.slug}`}
              >
                {person.name}
              </a>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getHighlightedName(person.motherName)}</td>
            <td>{getHighlightedName(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
