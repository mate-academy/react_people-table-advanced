import { NavLink, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { Person } from '../types';
import { SortType, PropName } from '../types/enum';

interface Props {
  people: Person[],
  handleSort: (value: string) => void,
  sortOrder: SortType,
  sortField: string | null,
}

export const PeopleTable: React.FC<Props> = ({
  people,
  handleSort,
  sortOrder,
  sortField,
}) => {
  const [propName, setpropName] = useState<string | null>(null);
  const handleSelection
  = (name: string | null) => {
    setpropName(name);
  };

  const location = useLocation().pathname.toString().slice(8);

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
                  {sortOrder === SortType.asc && sortField === PropName.Name
                  && <i className="fas fa-sort-up" />}
                  {sortOrder === SortType.desc && sortField === PropName.Name
                   && <i className="fas fa-sort-down" />}
                  {![SortType.asc, SortType.desc].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {[SortType.asc, SortType.desc].includes(sortOrder)
                   && sortField !== PropName.Name
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
                  {sortOrder === SortType.asc && sortField === PropName.Sex
                  && <i className="fas fa-sort-up" />}
                  {sortOrder === SortType.desc && sortField === PropName.Sex
                   && <i className="fas fa-sort-down" />}
                  {![SortType.asc, SortType.desc].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {[SortType.asc, SortType.desc].includes(sortOrder)
                   && sortField !== PropName.Sex
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
                  {sortOrder === SortType.asc && sortField === PropName.Born
                  && <i className="fas fa-sort-up" />}
                  {sortOrder === SortType.desc && sortField === PropName.Born
                   && <i className="fas fa-sort-down" />}
                  {![SortType.asc, SortType.desc].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {[SortType.asc, SortType.desc].includes(sortOrder)
                   && sortField !== PropName.Born
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
                  {sortOrder === SortType.asc && sortField === PropName.Died
                  && <i className="fas fa-sort-up" />}
                  {sortOrder === SortType.desc && sortField === PropName.Died
                   && <i className="fas fa-sort-down" />}
                  {![SortType.asc, SortType.desc].includes(sortOrder)
                   && <i className="fas fa-sort" />}
                  {[SortType.asc, SortType.desc].includes(sortOrder)
                   && sortField !== PropName.Died
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
              className={propName === person.name
                 && location === person.slug
                ? 'has-background-warning'
                : ''}
            >
              <td>
                <NavLink
                  to={person.slug}
                  className={person.sex === 'f'
                    ? ('has-text-danger')
                    : ''}
                  role="button"
                  onClick={() => handleSelection(person.name)}
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
                      to={person.mother?.slug}
                      className="has-text-danger"
                      onClick={() => {
                        handleSelection(person.mother?.name || null);
                      }}
                    >
                      {person.mother.name}
                    </NavLink>
                  ) : (
                    <p>
                      {person.motherName}
                    </p>
                  )}
              </td>
              <td>
                {person.father
                  ? (
                    <NavLink
                      to={person.father?.slug}
                      onClick={() => {
                        handleSelection(person.father?.name || null);
                      }}
                    >
                      {person.father.name}
                    </NavLink>
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
