import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import type { Person } from '../types/Person';

type Props = {
  people: Person[];
  sort: 'name' | 'sex' | 'born' | 'died' | null;
  order: 'asc' | 'desc';
};

const nextSortState = (
  currentSort: Props['sort'],
  currentOrder: Props['order'],
  column: NonNullable<Props['sort']>,
) => {
  if (currentSort !== column) {
    return { sort: column, order: 'asc' as const };
  }

  if (currentOrder === 'asc') {
    return { sort: column, order: 'desc' as const };
  }

  return { sort: null, order: 'asc' as const };
};

const buildSortParams = (
  currentSort: Props['sort'],
  currentOrder: Props['order'],
  column: NonNullable<Props['sort']>,
) => {
  const next = nextSortState(currentSort, currentOrder, column);

  if (next.sort === null) {
    return { sort: null, order: null as null };
  }

  return {
    sort: next.sort,
    order: next.order === 'desc' ? 'desc' : (null as null),
  };
};

const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'sex', label: 'Sex' },
  { key: 'born', label: 'Born' },
  { key: 'died', label: 'Died' },
] as const;

export const PeopleTable: React.FC<Props> = ({ people, sort, order }) => {
  const { pathname, search } = useLocation();

  const selected = pathname.startsWith('/people/')
    ? pathname.slice('/people/'.length)
    : null;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(({ key, label }) => {
            const params = buildSortParams(sort, order, key);

            const iconClass = cn('fas', {
              'fa-sort': sort !== key,
              'fa-sort-up': sort === key && order === 'asc',
              'fa-sort-down': sort === key && order === 'desc',
            });

            const sortTitle =
              sort !== key
                ? `Sort by ${label} (asc)`
                : order === 'asc'
                  ? `Sort by ${label} (desc)`
                  : `Clear sorting`;

            return (
              <th key={key}>
                <span
                  className={cn(
                    'is-flex',
                    'is-flex-wrap-nowrap',
                    'is-align-items-center',
                  )}
                >
                  {label}
                  <SearchLink
                    params={params}
                    className="ml-1"
                    title={sortTitle}
                    aria-label={sortTitle}
                    data-cy={`sort-${key}`}
                  >
                    <span className="icon">
                      <i className={iconClass} />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(p => {
          const motherPerson =
            p.mother || people.find(x => x.name === p.motherName);
          const fatherPerson =
            p.father || people.find(x => x.name === p.fatherName);

          return (
            <tr
              key={p.slug}
              data-cy="person"
              className={cn({ 'has-background-warning': selected === p.slug })}
            >
              <td>
                <Link
                  className={cn({ 'has-text-danger': p.sex === 'f' })}
                  to={{ pathname: `/people/${p.slug}`, search }}
                >
                  {p.name}
                </Link>
              </td>

              <td>{p.sex}</td>
              <td>{p.born ?? '-'}</td>
              <td>{p.died ?? '-'}</td>

              <td>
                {motherPerson ? (
                  <Link
                    className="has-text-danger"
                    to={{ pathname: `/people/${motherPerson.slug}`, search }}
                  >
                    {motherPerson.name}
                  </Link>
                ) : (
                  (p.motherName ?? '-')
                )}
              </td>

              <td>
                {fatherPerson ? (
                  <Link
                    to={{ pathname: `/people/${fatherPerson.slug}`, search }}
                  >
                    {fatherPerson.name}
                  </Link>
                ) : (
                  (p.fatherName ?? '-')
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
