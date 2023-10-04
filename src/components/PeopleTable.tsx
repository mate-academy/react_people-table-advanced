import classNames from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { Person } from '../types';
import { PersonLink } from './PersonalLink';
import { Sex } from '../types/Sex';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  const getParentsLink = (personName: string | null) => {
    if (!personName) {
      return '-';
    }

    const parent = people.find(({ name }) => name === personName);

    if (parent) {
      return <PersonLink person={parent} />;
    }

    return personName;
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

      {people.map((person) => (
        <tbody key={person.slug}>
          <tr
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === personSlug,
            })}
          >
            <td>
              <Link
                to={person.slug}
                className={classNames({
                  'has-text-danger': person.sex === Sex.Femail,
                })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getParentsLink(person.motherName)}</td>
            <td>{getParentsLink(person.fatherName)}</td>
          </tr>
        </tbody>
      ))}
    </table>
  );
};
