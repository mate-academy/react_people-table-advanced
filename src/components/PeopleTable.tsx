import React from 'react';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import {
  Order,
  Headers,
  PeopleTableHeadersProps,
  PeopleTableHeaders,
} from './PeopleTableHeaders';
interface PeopleTableProps {
  people: Person[];
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people }: PeopleTableProps) => {
  const { slug } = useParams();

  const columnHeaders: PeopleTableHeadersProps[] = [
    {
      label: Headers.name,
      hasLink: true,
      order: Order.asc,
    },
    {
      label: Headers.sex,
      hasLink: true,
      order: Order.asc,
    },
    {
      label: Headers.born,
      hasLink: true,
      order: Order.asc,
    },
    {
      label: Headers.died,
      hasLink: true,
      order: Order.asc,
    },
    {
      label: Headers.mother,
    },
    {
      label: Headers.father,
    },
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columnHeaders.map(header => (
            <PeopleTableHeaders key={header.label} {...header} />
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = people.find(p => p.name === person.motherName);

          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              className={`${person.slug === slug ? 'has-background-warning' : ''}`}
              data-cy="person"
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

/*
import { useParams } from 'react-router-dom';
import { Person } from '../types';




export function PeopleTable({ people }: TableComponentProps) {

  return (
    <>
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


      </table>
    </>
  );
}


*/
