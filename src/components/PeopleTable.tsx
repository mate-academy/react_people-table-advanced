/* eslint-disable jsx-a11y/control-has-associated-label */

import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();
  const [selectPerson, setSelectPerson] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      setSelectPerson(slug);
    }
  }, [slug]);

  const findPersonByName = (name: string | undefined | null): Person | null =>
    name
      ? people.find(p => p.name.toLowerCase() === name.toLowerCase()) || null
      : null;

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
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selectPerson,
            })}
          >
            <td>
              <a href="#/people/pieter-haverbeke-1602">{person.name}</a>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {/* <td>-</td> */}
            <>
              <td>
                {person.motherName ? (
                  findPersonByName(person.motherName) ? (
                    <PersonLink person={findPersonByName(person.motherName)} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  findPersonByName(person.fatherName) ? (
                    <PersonLink person={findPersonByName(person.fatherName)} />
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
