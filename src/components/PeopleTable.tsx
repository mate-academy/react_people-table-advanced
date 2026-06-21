/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = { people: Person[] };

const SORT_COLUMNS = ['name', 'sex', 'born', 'died'] as const;

type SortCol = (typeof SORT_COLUMNS)[number];

const getSortIcon = (col: SortCol, sort: string, order: string) => {
  if (sort !== col) {
    return 'fas fa-sort';
  }

  if (order === 'desc') {
    return 'fas fa-sort-down';
  }

  return 'fas fa-sort-up';
};

const getSortParams = (col: SortCol, sort: string, order: string) => {
  if (sort !== col) {
    return { sort: col, order: null };
  }

  if (order !== 'desc') {
    return { sort: col, order: 'desc' };
  }

  return { sort: null, order: null };
};

export const PeopleTable = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const personLink = (person: Person | undefined, name: string | null) => {
    if (!person) {
      return name || '-';
    }

    return (
      <a
        href={`#/people/${person.slug}`}
        className={person.sex === 'f' ? 'has-text-danger' : ''}
      >
        {person.name}
      </a>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_COLUMNS.map(col => (
            <th key={col}>
              <span className="is-flex is-flex-wrap-nowrap">
                {col.charAt(0).toUpperCase() + col.slice(1)}
                <SearchLink params={getSortParams(col, sort, order)}>
                  <span className="icon">
                    <i className={getSortIcon(col, sort, order)} />
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
            className={slug === person.slug ? 'has-background-warning' : ''}
          >
            <td>
              <a
                href={`#/people/${person.slug}`}
                className={person.sex === 'f' ? 'has-text-danger' : ''}
              >
                {person.name}
              </a>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{personLink(person.mother, person.motherName)}</td>
            <td>{personLink(person.father, person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
