import React from 'react';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
  sort: string;
  order: string;
  onSortChange: (field: string) => void;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({
  people,
  selectedSlug,
  sort,
  order,
  onSortChange,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => onSortChange('name')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a>
                <span className="icon">
                  {sort !== 'name' && <i className="fas fa-sort" />}
                  {sort === 'name' && order !== 'desc' && (
                    <i className="fas fa-sort-up" />
                  )}
                  {sort === 'name' && order === 'desc' && (
                    <i className="fas fa-sort-down" />
                  )}
                </span>
              </a>
            </span>
          </th>

          <th onClick={() => onSortChange('sex')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a>
                <span className="icon">
                  {sort !== 'sex' && <i className="fas fa-sort" />}
                  {sort === 'sex' && order !== 'desc' && (
                    <i className="fas fa-sort-up" />
                  )}
                  {sort === 'sex' && order === 'desc' && (
                    <i className="fas fa-sort-down" />
                  )}
                </span>
              </a>
            </span>
          </th>

          <th onClick={() => onSortChange('born')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a>
                <span className="icon">
                  {sort !== 'born' && <i className="fas fa-sort" />}
                  {sort === 'born' && order !== 'desc' && (
                    <i className="fas fa-sort-up" />
                  )}
                  {sort === 'born' && order === 'desc' && (
                    <i className="fas fa-sort-down" />
                  )}
                </span>
              </a>
            </span>
          </th>

          <th onClick={() => onSortChange('died')}>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a>
                <span className="icon">
                  {sort !== 'died' && <i className="fas fa-sort" />}
                  {sort === 'died' && order !== 'desc' && (
                    <i className="fas fa-sort-up" />
                  )}
                  {sort === 'died' && order === 'desc' && (
                    <i className="fas fa-sort-down" />
                  )}
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const motherPerson =
            people.find(p => p.name === person.motherName) ?? null;
          const fatherPerson =
            people.find(p => p.name === person.fatherName) ?? null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {motherPerson ? (
                  <PersonLink person={motherPerson} />
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {fatherPerson ? (
                  <PersonLink person={fatherPerson} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
