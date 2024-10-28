/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../types';
import { sortOptions } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(sortOptions).map(option => (
            <th key={option}>
              <span className="is-flex is-flex-wrap-nowrap">
                {option}
                <a href={`#/people?sort=${option.toLocaleLowerCase()}`}>
                  <span className="icon">
                    <i className="fas fa-sort" />
                  </span>
                </a>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug: personsSlug,
          } = person;

          const personsMother = people.find(
            mother => mother.name === motherName,
          );
          const personsFather = people.find(
            father => father.name === fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': personsSlug === slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {personsMother ? (
                  <PersonLink person={personsMother} />
                ) : (
                  <p>{motherName || '-'}</p>
                )}
              </td>
              <td>
                {personsFather ? (
                  <PersonLink person={personsFather} />
                ) : (
                  <p>{fatherName || '-'}</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
