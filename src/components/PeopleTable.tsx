import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonWithParents } from '../types/PersonWithParent';
import { PersonLink } from './PeopleLink';
import { SearchLink } from './SearchLink';

interface Props {
  people: PersonWithParents[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (column: string) => {
    if (sort !== column) {
      return { sort: column, order: null };
    }

    if (order !== 'desc') {
      return { order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (column: string) => {
    if (sort !== column) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column.charAt(0).toUpperCase() + column.slice(1)}
                <SearchLink
                  params={getSortParams(column)}
                  className="icon ml-1"
                >
                  <i className={classNames('fas', getSortIcon(column))} />
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
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherPerson ? (
                <PersonLink person={person.motherPerson} />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.fatherPerson ? (
                <PersonLink person={person.fatherPerson} />
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
