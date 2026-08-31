/* eslint-disable prettier/prettier */
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';
import React from 'react';

type Props = {
  people: Person[];
};

type PersonLinkProps = {
  person: Person;
  people: Person[];
};

const PersonLink = ({ person, people }: PersonLinkProps) => {
  const [searchParams] = useSearchParams();

  const existingPerson = people.find(
    currentPerson => currentPerson.name === person.name,
  );

  if (!existingPerson) {
    return (
      <span className={person.sex === 'f' ? 'has-text-danger' : ''}>
        {person.name}
      </span>
    );
  }

  return (
    <Link
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      to={{
        pathname: `/people/${existingPerson.slug}`,
        search: searchParams.toString(),
      }}
    >
      {person.name}
    </Link>
  );
};

const getPersonByName = (
  people: Person[],
  name: string | null,
): Person | null => {
  if (!name) {
    return null;
  }

  return people.find(person => person.name === name) || null;
};

export const PeopleTable = ({ people }: Props) => {
  const { personSlug } = useParams();

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

              <Link to="/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex

              <Link to="/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born

              <Link to="/people?sort=born">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died

              <Link to="/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = getPersonByName(people, person.motherName);
          const father = getPersonByName(people, person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                person.slug === personSlug
                  ? 'has-background-warning'
                  : ''
              }
            >
              <td>
                <PersonLink person={person} people={people} />
              </td>

              <td>{person.sex}</td>

              <td>{person.born}</td>

              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} people={people} />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  father ? (
                    <PersonLink person={father} people={people} />
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
