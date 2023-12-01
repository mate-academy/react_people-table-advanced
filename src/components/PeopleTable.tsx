import React from 'react';
import classNames from 'classnames';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

export enum SortBy {
  Name = 'name',
  Sex = 'sex',
  Born = 'born',
  Died = 'died',
}

const sortPeople = (
  people: Person[],
  sort: string | null,
  order: string | null,
): Person[] => {
  const isReversed: number = order ? -1 : 1;

  return [...people].sort((a, b) => {
    switch (sort) {
      case 'name':
      case 'sex':
        return (a[sort] as string).localeCompare(b[sort]) * isReversed;
      case 'born':
      case 'died':
        return (+a[sort] - +b[sort]) * isReversed;
      default:
        return 0;
    }
  });
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  function findParent(parent: string | null) {
    return people.find(person => person.name === parent);
  }

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sortedPeople: Person[] = sortPeople(people, sort, order);

  const sortByColumn = (column: string) => {
    if (sort !== column) {
      return { sort: column, order: null };
    }

    if (!order) {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };
  /* eslint-disable jsx-a11y/control-has-associated-label */

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.keys(SortBy).map((sortName: string) => (
            <th key={sortName}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortName}
                <Link
                  to={{
                    search: getSearchWith(
                      searchParams,
                      sortByColumn(sortName.toLowerCase()),
                    ),
                  }}
                  aria-label={`Sort by ${sortName}`}
                >
                  <span className="icon">
                    <i className={classNames('fas fa-sort', {
                      'fa-sort-up': sort === sortName.toLowerCase() && !order,
                      'fa-sort-down': sort === sortName.toLowerCase() && order,
                    })}
                    />
                  </span>
                </Link>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map((person) => {
          const father = findParent(person.fatherName);
          const mother = findParent(person.motherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': person.slug === slug,
              })}
              aria-describedby={`person-${person.slug}-label`}
            >
              {/* eslint-disable jsx-a11y/control-has-associated-label */}
              <td>
                <PersonLink person={person} aria-label={`Details for ${person.name}`} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : person.motherName || '-'}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : person.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
