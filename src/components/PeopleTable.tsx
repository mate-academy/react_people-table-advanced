import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

interface Props {
  people: Person[];
  sortField: string | null;
  sortOrder: 'asc' | 'desc';
  onSortClick: (field: keyof Person) => void;
}

export const PeopleTable: React.FC<Props> = React.memo(({
  people,
  onSortClick,
  sortField,
  sortOrder,
}) => {
  const { slug } = useParams();

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
              <a
                href="#/people?sort=name"
                onClick={() => onSortClick('name')}
              >
                <span className="icon">
                  <i className={cn('fas',
                    {
                      'fa-sort': !sortField && !sortOrder,
                      'fa-sort-up': sortOrder === 'asc',
                      'fa-sort-down': sortOrder === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={() => onSortClick('sex')}
              >
                <span className="icon">
                  <i className={cn('fas',
                    {
                      'fa-sort': !sortField && !sortOrder,
                      'fa-sort-up': sortOrder === 'asc',
                      'fa-sort-down': sortOrder === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
            >
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={() => onSortClick('born')}
              >
                <span className="icon">
                  <i className={cn('fas',
                    {
                      'fa-sort': !sortField && !sortOrder,
                      'fa-sort-up': sortOrder === 'asc',
                      'fa-sort-down': sortOrder === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={() => onSortClick('died')}
              >
                <span className="icon">
                  <i className={cn('fas',
                    {
                      'fa-sort': !sortField && !sortOrder,
                      'fa-sort-up': sortOrder === 'asc',
                      'fa-sort-down': sortOrder === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={cn({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <NavLink
                to={`../${person.slug}`}
                className={cn(
                  { 'has-text-danger': person.sex === 'f' },
                )}
              >
                {person.name}
              </NavLink>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother
                ? (
                  <NavLink
                    to={`/people/${person.mother.slug}`}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </NavLink>
                ) : (
                  person.motherName || '-'
                )}
            </td>
            <td>
              {person.father
                ? (
                  <NavLink to={`/people/${person.father.slug}`}>
                    {person.fatherName}
                  </NavLink>
                ) : (
                  person.fatherName || '-'
                )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
