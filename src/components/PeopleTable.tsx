import { useMemo } from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getSearchWith } from '../utils/searchHelper'; // перевір шлях до утиліти

type SortField = 'name' | 'sex' | 'born' | 'died';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

const SORT_COLUMNS: { field: SortField; label: string }[] = [
  { field: 'name', label: 'Name' },
  { field: 'sex', label: 'Sex' },
  { field: 'born', label: 'Born' },
  { field: 'died', label: 'Died' },
];

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');
  const currentSearch = searchParams.toString();
  const linkSearch = currentSearch ? `?${currentSearch}` : '';

  const getNextSortParams = (field: SortField) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIconClass = (field: SortField) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return people;
    }

    const direction = order === 'desc' ? -1 : 1;

    return [...people].sort((a, b) => {
      switch (sort) {
        case 'name':
        case 'sex':
          return a[sort].localeCompare(b[sort]) * direction;

        case 'born':
        case 'died':
          return (a[sort] - b[sort]) * direction;

        default:
          return 0;
      }
    });
  }, [people, sort, order]);

  const findPersonByName = (name: string | null) => {
    if (!name) {
      return undefined;
    }

    return people.find(person => person.name === name);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_COLUMNS.map(({ field, label }) => {
            const nextSearch = getSearchWith(
              searchParams,
              getNextSortParams(field),
            );

            return (
              <th key={field}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {label}
                  <Link to={{ search: nextSearch ? `?${nextSearch}` : '' }}>
                    <span className="icon">
                      <i
                        className={classNames('fas', getSortIconClass(field))}
                      />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = findPersonByName(person.motherName);
          const father = findPersonByName(person.fatherName);
          const isSelected = person.slug === selectedSlug;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': isSelected,
              })}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: linkSearch,
                  }}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {mother ? (
                  <Link
                    to={{
                      pathname: `/people/${mother.slug}`,
                      search: linkSearch,
                    }}
                    className="has-text-danger"
                  >
                    {mother.name}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <Link
                    to={{
                      pathname: `/people/${father.slug}`,
                      search: linkSearch,
                    }}
                  >
                    {father.name}
                  </Link>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
