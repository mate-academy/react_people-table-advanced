/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Person } from '../types';
import { getPersonSlug } from '../utils/PersonSlug';
import { PersonLink } from './PersonLink';
import { SortableHeader } from './SortableHeader';
import { useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
  allPeople: Person[];
  activePersonId?: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  allPeople,
  activePersonId,
}) => {
  const [searchParams] = useSearchParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SortableHeader label="Name" field="name" />
          </th>

          <th>
            <SortableHeader label="Sex" field="sex" />
          </th>

          <th>
            <SortableHeader label="Born" field="born" />
          </th>

          <th>
            <SortableHeader label="Died" field="died" />
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isActive = activePersonId === getPersonSlug(person);

          return (
            <tr
              data-cy="person"
              key={getPersonSlug(person)}
              className={isActive ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} searchParams={searchParams} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink
                  name={person.motherName}
                  people={allPeople}
                  searchParams={searchParams}
                />
              </td>
              <td>
                <PersonLink
                  name={person.fatherName}
                  people={allPeople}
                  searchParams={searchParams}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
