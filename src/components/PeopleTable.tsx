import React, { useState } from 'react';
import { Person } from '../types';

interface Props {
  people: Person[],
  handleSort: (value: string) => void,
  sortOrder: string,
  propName: string,
}

export const PeopleTable: React.FC<Props> = ({
  people,
  handleSort,
  sortOrder,
  propName,
}) => {
  const [selectedName, setSelectedName] = useState('');

  const handleSelection
  = (event: React.MouseEvent<HTMLAnchorElement>, name: string) => {
    event.preventDefault();

    setSelectedName(name);
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
              <a
                href="#/people?sort=name"
                onClick={() => handleSort('name')}
              >
                <span className="icon">
                  {sortOrder === 'asc' && propName === 'name'
                  && <i className="fas fa-sort-down" />}
                  {sortOrder === 'desc' && propName === 'name'
                   && <i className="fas fa-sort-up" />}
                  {!['asc', 'desc'].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {['asc', 'desc'].includes(sortOrder)
                   && propName !== 'name' && (<i className="fas fa-sort" />)}
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={() => handleSort('sex')}
              >
                <span className="icon">
                  {sortOrder === 'asc' && propName === 'sex'
                  && <i className="fas fa-sort-down" />}
                  {sortOrder === 'desc' && propName === 'sex'
                   && <i className="fas fa-sort-up" />}
                  {!['asc', 'desc'].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {['asc', 'desc'].includes(sortOrder)
                   && propName !== 'sex' && (<i className="fas fa-sort" />)}
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={() => handleSort('born')}
              >
                <span className="icon">
                  {sortOrder === 'asc' && propName === 'born'
                  && <i className="fas fa-sort-down" />}
                  {sortOrder === 'desc' && propName === 'born'
                   && <i className="fas fa-sort-up" />}
                  {!['asc', 'desc'].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {['asc', 'desc'].includes(sortOrder)
                   && propName !== 'born' && (<i className="fas fa-sort" />)}
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={() => handleSort('died')}
              >
                <span className="icon">
                  {sortOrder === 'asc' && propName === 'icon'
                  && <i className="fas fa-sort-down" />}
                  {sortOrder === 'desc' && propName === 'icon'
                   && <i className="fas fa-sort-up" />}
                  {!['asc', 'desc'].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {['asc', 'desc'].includes(sortOrder)
                   && propName !== 'icon' && (<i className="fas fa-sort" />)}
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>

        {people.map((person) => {
          return (
            <tr
              key={person.name}
              className={selectedName === person.name
                ? 'has-background-warning'
                : ''}
            >
              <td>
                <a
                  href={person.slug}
                  className={person.sex === 'f'
                    ? ('has-text-danger')
                    : ''}
                  role="button"
                  onClick={(event) => {
                    handleSelection(event, person.name);
                  }}
                >
                  {person.name}
                </a>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.mother
                  ? (
                    <a
                      href={person.mother?.slug}
                      className="has-text-danger"
                    >
                      {person.mother.name}
                    </a>
                  ) : (
                    <p>
                      {person.motherName}
                    </p>
                  )}
              </td>
              <td>
                {person.father
                  ? (
                    <a
                      href={person.father?.slug}
                    >
                      {person.father.name}
                    </a>
                  ) : (
                    <p>
                      {person.fatherName}
                    </p>
                  )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
