import React from 'react';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import {
  Link,
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import cn from 'classnames';
import { sortPeople } from './PeopleFilters';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const titleColumn = ['Name', 'Sex', 'Born', 'Died'];
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { search } = useLocation();
  const param = {
    sex: searchParams.get('sex'),
    query: searchParams.get('query'),
    sort: searchParams.get('sort') || '',
    order: searchParams.get('order') || '',
    centuries: searchParams.getAll('centuries') || [],
  };

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {titleColumn.map(title => (
            <th key={title}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <SearchLink
                  params={{
                    sort: order === 'desc' && sort === title ? null : title,
                    order: sort === title && !order ? 'desc' : null,
                  }}
                >
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
        {sortPeople(people, param).map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <NavLink
                  to={`/people/${person.slug}`}
                  className={cn({ 'has-text-danger': person.sex === 'f' })}
                >
                  {person.name}
                </NavLink>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  mother ? (
                    <Link
                      to={{ pathname: `/people/${mother?.slug}`, search }}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  father ? (
                    <Link to={{ pathname: `/people/${father?.slug}`, search }}>
                      {person.fatherName}
                    </Link>
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
