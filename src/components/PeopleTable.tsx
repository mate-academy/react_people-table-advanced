import React from 'react';
import { Person } from '../types';

interface Props {
  visiblePeople: Person[];
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ visiblePeople, people }) => {
  const getPersonLink = (name: string) => {
    const person = people.find((p) => p.name === name);

    return person ? <a href={`#/people/${person.slug}`}>{name}</a> : name;
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
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map((p) => (
          <tr data-cy="person" key={p.slug}>
            <td>
              <a href={`#/people/${p.slug}`}>{p.name}</a>
            </td>
            <td>{p.sex}</td>
            <td>{p.born}</td>
            <td>{p.died}</td>
            <td>{p.mother ? getPersonLink(p.mother.name) : '-'}</td>
            <td>{p.father ? getPersonLink(p.father.name) : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
