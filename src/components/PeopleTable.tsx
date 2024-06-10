/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { getSortedPeople } from '../utils/getSortedPeople';

type Props = {
  preparedPeople: Person[];
};

type SortingCategories = 'name' | 'sex' | 'born' | 'died';

const columnsToSort: SortingCategories[] = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC<Props> = ({ preparedPeople }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const sortParam = searchParams.get('sort') || '';
  const orderParam = searchParams.get('order') || '';

  const handleOrdering = (sortBy: SortingCategories) => {
    if (sortBy === sortParam) {
      if (orderParam === 'asc') {
        return {
          sort: sortParam,
          order: 'desc',
        };
      }

      if (orderParam === 'desc') {
        return {
          sort: null,
          order: null,
        };
      }
    }

    return {
      sort: sortBy,
      order: 'asc',
    };
  };

  const getClassesForOrder = (sortBy: SortingCategories) => {
    return classNames('fas', {
      'fa-sort': sortParam !== sortBy,
      'fa-sort-up': sortParam === sortBy && orderParam === 'asc',
      'fa-sort-down': sortParam === sortBy && orderParam === 'desc',
    });
  };

  const sortedPeople = getSortedPeople(
    preparedPeople,
    sortParam as keyof Person,
    orderParam,
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columnsToSort.map(column => {
            const columnName = column[0].toUpperCase() + column.slice(1);

            return (
              <th key={column}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {columnName}
                  <SearchLink params={handleOrdering(column)}>
                    <span className="icon">
                      <i className={getClassesForOrder(column)} />
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
        {sortedPeople.map(person => (
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
            key={person.slug}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
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
                  to={`/people/${person.mother.slug}`}
                  className="has-text-danger"
                >
                  {person.motherName}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.father ? (
                <Link to={`/people/${person.father.slug}`}>
                  {person.fatherName}
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
