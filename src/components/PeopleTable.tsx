/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

export type SortField = 'name' | 'sex' | 'born' | 'died';
export type SortOrder = 'asc' | 'desc';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

type SortConfig = {
  field: SortField;
  label: string;
};

const SORT_OPTIONS: SortConfig[] = [
  { field: 'name', label: 'Name' },
  { field: 'sex', label: 'Sex' },
  { field: 'born', label: 'Born' },
  { field: 'died', label: 'Died' },
];

const getNextSortParams = (
  currentSort: string | null,
  currentOrder: string | null,
  field: SortField,
) => {
  if (currentSort !== field) {
    return {
      sort: field,
      order: null,
    };
  }

  if (currentOrder === 'desc') {
    return {
      sort: null,
      order: null,
    };
  }

  return {
    sort: field,
    order: 'desc',
  };
};

const getSortIcon = (
  currentSort: string | null,
  currentOrder: string | null,
  field: SortField,
) => {
  if (currentSort !== field) {
    return '/images/sort_both.png';
  }

  return currentOrder === 'desc'
    ? '/images/sort_desc.png'
    : '/images/sort_asc.png';
};

const ParentLink: React.FC<{ parent?: Person; parentName: string | null }> = ({
  parent,
  parentName,
}) => {
  const { search } = useLocation();

  if (!parentName) {
    return <>-</>;
  }

  if (!parent) {
    return <>{parentName}</>;
  }

  return (
    <Link
      to={{
        pathname: `/people/${parent.slug}`,
        search,
      }}
      className={classNames({
        'has-text-danger': parent.sex === 'f',
      })}
    >
      {parent.name}
    </Link>
  );
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();
  const { search } = useLocation();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_OPTIONS.map(({ field, label }) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}

                <SearchLink
                  params={getNextSortParams(currentSort, currentOrder, field)}
                >
                  <span className="icon">
                    <img
                      src={getSortIcon(currentSort, currentOrder, field)}
                      alt=""
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search,
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
              <ParentLink
                parent={person.mother}
                parentName={person.motherName}
              />
            </td>
            <td>
              <ParentLink
                parent={person.father}
                parentName={person.fatherName}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
