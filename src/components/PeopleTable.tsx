import React from 'react';
import classNames from 'classnames';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';
import { SortHeader } from './SortHeader';

type Props = {
  people: Person[];
  slug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, slug }: Props) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SortHeader field="name" label="Name" />
          </th>
          <th>
            <SortHeader field="sex" label="Sex" />
          </th>
          <th>
            <SortHeader field="born" label="Born" />
          </th>
          <th>
            <SortHeader field="died" label="Died" />
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
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PeopleLink name={person.name} people={people} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PeopleLink name={person.motherName || null} people={people} />
            </td>
            <td>
              <PeopleLink name={person.fatherName || null} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
