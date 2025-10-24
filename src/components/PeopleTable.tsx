/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams, useParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortIcon = (field: SortField) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-up' : 'fas fa-sort-down';
  };

  const getSortParams = (field: SortField) => {
    if (sort !== field) {
      // First click: sort ascending
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      // Second click: sort descending
      return { sort: field, order: 'desc' };
    }

    // Third click: remove sorting
    return { sort: null, order: null };
  };

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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

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
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <Link
                to={{
                  pathname: `/people/${person.slug}`,
                  search: searchParams.toString(),
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
              {person.mother ? (
                <Link
                  to={{
                    pathname: `/people/${person.mother.slug}`,
                    search: searchParams.toString(),
                  }}
                  className={classNames({
                    'has-text-danger': person.mother.sex === 'f',
                  })}
                >
                  {person.mother.name}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <Link
                  to={{
                    pathname: `/people/${person.father.slug}`,
                    search: searchParams.toString(),
                  }}
                >
                  {person.father.name}
                </Link>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
