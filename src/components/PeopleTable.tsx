/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from "classnames";
import { useParams } from "react-router-dom";
import React from "react";
import { Person } from "../types";
import { PersonLink } from "./PersonLink";

interface Props {
  data: Person[] | null;
}

export const PeopleTable: React.FC<Props> = ({ data }) => {
  const { personId } = useParams();

  const getPersonSlug = (name: string, born: number) =>
    `${name.toLowerCase().trim().replace(/\s+/g, '-')}-${born}`;

  const getPersonByName = (name: string | null) =>
    data?.find(person => person.name === name) || null;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {data?.map(person => {
          const slug = getPersonSlug(person.name, person.born);
          const mother = getPersonByName(person.motherName || null);
          const father = getPersonByName(person.fatherName || null);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': personId === slug,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} className="has-text-danger" />
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
                    <PersonLink person={father} />
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
