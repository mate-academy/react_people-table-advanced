import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: currentSlug } = useParams();

  const getParent = (parentName: string | null) => {
    const parent = people.find(person => person.name === parentName);

    return parent ? <PersonLink person={parent} /> : parentName;
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
                aria-label="sort"
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#/people?sort=sex"
                aria-label="sort"
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#/people?sort=born&amp;order=desc"
                aria-label="sort"
              >
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#/people?sort=died"
                aria-label="sort"
              >
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
        {people.map((person) => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn({
                'has-background-warning': currentSlug === slug,
              })}
            >
              <td
                aria-label="none"
              >
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {getParent(motherName) || '-'}
              </td>
              <td>{getParent(fatherName) || '-'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
