import React, { useState } from 'react';
import { Person } from '../types';
import { SortType, PropName } from './enum';

interface Props {
  people: Person[],
  handleSort: (value: string) => void,
  sortOrder: SortType,
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
                onClick={() => handleSort(PropName.Name)}
              >
                <span className="icon">
                  {sortOrder === SortType.asc && propName === PropName.Name
                  && <i className="fas fa-sort-up" />}
                  {sortOrder === SortType.desc && propName === PropName.Name
                   && <i className="fas fa-sort-down" />}
                  {![SortType.asc, SortType.desc].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {[SortType.asc, SortType.desc].includes(sortOrder)
                   && propName !== PropName.Name
                   && (<i className="fas fa-sort" />)}
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                onClick={() => handleSort(PropName.Sex)}
              >
                <span className="icon">
                  {sortOrder === SortType.asc && propName === PropName.Sex
                  && <i className="fas fa-sort-up" />}
                  {sortOrder === SortType.desc && propName === PropName.Sex
                   && <i className="fas fa-sort-down" />}
                  {![SortType.asc, SortType.desc].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {[SortType.asc, SortType.desc].includes(sortOrder)
                   && propName !== PropName.Sex
                   && (<i className="fas fa-sort" />)}
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                onClick={() => handleSort(PropName.Born)}
              >
                <span className="icon">
                  {sortOrder === SortType.asc && propName === PropName.Born
                  && <i className="fas fa-sort-up" />}
                  {sortOrder === SortType.desc && propName === PropName.Born
                   && <i className="fas fa-sort-down" />}
                  {![SortType.asc, SortType.desc].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {[SortType.asc, SortType.desc].includes(sortOrder)
                   && propName !== PropName.Born
                   && (<i className="fas fa-sort" />)}
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                onClick={() => handleSort(PropName.Died)}
              >
                <span className="icon">
                  {sortOrder === SortType.asc && propName === PropName.Died
                  && <i className="fas fa-sort-up" />}
                  {sortOrder === SortType.desc && propName === PropName.Died
                   && <i className="fas fa-sort-down" />}
                  {![SortType.asc, SortType.desc].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {[SortType.asc, SortType.desc].includes(sortOrder)
                   && propName !== PropName.Died
                    && (<i className="fas fa-sort" />)}
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
