import React from 'react';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const findPerson = (name: string | null) => {
    return people.find(person => person.name === name);
  };

  const { userSlug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const setSorting = (sortBy: string) => {
    if (sort === sortBy) {
      return order === 'desc'
        ? { sort: null, order: null }
        : { sort: sortBy, order: 'desc' };
    }

    return { sort: sortBy, order: null };
  };

  const headTable = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {headTable.map(item => (
            <th key={item}>
              <span className="is-flex is-flex-wrap-nowrap">
                {item}
                <SearchLink params={setSorting(`${item.toLowerCase()}`)}>
                  <span className="icon">
                    <i className="fas fa-sort" />
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
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': userSlug === person.slug,
            })}
          >
            <td>
              <Link
                to={`${person.slug}`}
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
              {findPerson(person.motherName) ? (
                <Link
                  to={`${findPerson(person.motherName)?.slug}`}
                  className="has-text-danger"
                >
                  {person.motherName}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {findPerson(person.fatherName) ? (
                <Link to={`${findPerson(person.fatherName)?.slug}`}>
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
