import classNames from 'classnames';
import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';

  const sorting = () => {
    switch (sort) {
      case 'name':
      case 'sex':
        return people.sort((a, b) => a[sort].localeCompare(b[sort]));

      case 'born':
      case 'died':
        return people.sort((a, b) => a[sort] - b[sort]);
      default:
        return people;
    }
  };

  const visiblePeople = sorting();

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
        {visiblePeople.map(person => {
          const mother = people
            .find(currPerson => currPerson.name === person.motherName);
          const father = people
            .find(currPerson => currPerson.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames(
                { 'has-background-warning': person.slug === slug },
              )}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              {mother
                ? <td><PersonLink person={mother} /></td>
                : <td>{person.motherName ? person.motherName : '-'}</td>}
              {father
                ? <td><PersonLink person={father} /></td>
                : <td>{person.fatherName ? person.fatherName : '-'}</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
