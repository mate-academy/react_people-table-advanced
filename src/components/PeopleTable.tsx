import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import PersonLink from './PersonLink';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people }: { people: Person[] }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order') || 'asc';
  const sort = searchParams.get('sort');

  const getSortIcon = (column: string) => {
    if (sort !== column) {
      return 'fa-sort';
    }

    return order === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  };

  const getNextSortParams = (column: string) => {
    if (sort !== column) {
      return { sort: column, order: 'asc' };
    }

    if (order === 'asc') {
      return { sort: column, order: 'desc' };
    }

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
              <SearchLink params={getNextSortParams('name')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('name')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getNextSortParams('sex')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('sex')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getNextSortParams('born')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('born')}`} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getNextSortParams('died')}>
                <span className="icon">
                  <i className={`fas ${getSortIcon('died')}`} />
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
            key={person.name}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                people.find(p => p.name === person.motherName) ? (
                  <PersonLink
                    person={people.find(p => p.name === person.motherName)!}
                  />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                people.find(p => p.name === person.fatherName) ? (
                  <PersonLink
                    person={people.find(p => p.name === person.fatherName)!}
                  />
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
