import React from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  people: Person[];
}

const PersonLink: React.FC<{
  name: string | null;
  people: Person[];
}> = ({ name, people }) => {
  if (!name) {
    return <>-</>;
  }

  const foundPerson = people.find(p => p.name === name);

  if (!foundPerson) {
    return <>{name}</>;
  }

  const linkClass = classNames({
    'has-text-danger': foundPerson.sex === 'f',
  });

  return (
    <Link to={`/people/${foundPerson.slug}`} className={linkClass}>
      {name}
    </Link>
  );
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { personSlug } = useParams();

  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  const getSortParams = (field: string) => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (currentOrder === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: field, order: 'desc' };
  };

  const getSortIconClass = (field: string) => {
    if (currentSort !== field) {
      return 'fa-sort';
    }

    return currentOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
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
                  <i className={`fas ${getSortIconClass('name')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i className={`fas ${getSortIconClass('sex')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i className={`fas ${getSortIconClass('born')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i className={`fas ${getSortIconClass('died')}`} />
                </span>
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person, index) => {
          const isSelected = person.slug === personSlug;

          return (
            <tr
              data-cy="person"
              key={`${person.slug}-${index}`}
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink name={person.name} people={people} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink name={person.motherName} people={people} />
              </td>
              <td>
                <PersonLink name={person.fatherName} people={people} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
