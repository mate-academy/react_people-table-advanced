/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import React from 'react';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  updateSort: (sort: string) => void;
};

export const PeopleTable: React.FC<Props> = ({ people, updateSort }) => {
  const { currentPerson } = useParams();
  const [searchParams] = useSearchParams();

  function getSortIcon(field: string) {
    if (searchParams.get('sort') === field) {
      return searchParams.get('order') === 'desc'
        ? 'fas fa-sort-down'
        : 'fas fa-sort-up';
    }

    return 'fas fa-sort';
  }

  const handleSort = (field: string) => {
    updateSort(field);
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
              <a onClick={() => handleSort('name')}>
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => handleSort('sex')}>
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => handleSort('born')}>
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => handleSort('died')}>
                <span className="icon">
                  <i className={getSortIcon('died')} />
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
          const {
            slug,
            sex,
            born,
            died,
            mother,
            motherName,
            father,
            fatherName,
          } = person;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === currentPerson,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
