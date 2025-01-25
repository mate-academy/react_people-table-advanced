import classNames from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { SortTypes } from '../types/SortTypes';
import { SortParam } from './SortParam';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const selectedPerson = people.find(person => person.slug === slug) || null;

  const sortKeys = [
    SortTypes.NAME,
    SortTypes.SEX,
    SortTypes.BORN,
    SortTypes.DIED,
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortKeys.map(key => (
            <SortParam param={key} key={key} />
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={classNames({
              'has-background-warning': selectedPerson?.slug === person.slug,
            })}
          >
            <td>
              <Link
                to={person.slug}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <Link to={person.mother.slug} className="has-text-danger">
                  {person.motherName}
                </Link>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.father ? (
                <Link to={person.father.slug}>{person.fatherName}</Link>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
