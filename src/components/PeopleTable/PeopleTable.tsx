import React from 'react';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import cn from 'classnames';
import { SortableColHead } from '../SortableColHead';

const columns = [
  { title: 'Name', sortField: 'name' },
  { title: 'Sex', sortField: 'sex' },
  { title: 'Born', sortField: 'born' },
  { title: 'Died', sortField: 'died' },
];

interface Props {
  peoples: Person[];
  selectedPersonSlug?: string;
  onSort: (sortField: string) => void;
  searchParams: URLSearchParams;
}

export const PeopleTable: React.FC<Props> = ({
  peoples,
  selectedPersonSlug,
  onSort,
  searchParams,
}) => {
  const handleClick = (sortField: string) => {
    onSort(sortField);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => (
            <SortableColHead
              key={column.sortField}
              title={column.title}
              sortField={column.sortField}
              onSort={handleClick}
              searchParams={searchParams}
            />
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peoples.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': selectedPersonSlug === person.slug,
            })}
          >
            <td>
              <PersonLink personName={person.name} allPeople={peoples} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink personName={person.motherName} allPeople={peoples} />
            </td>
            <td>
              <PersonLink personName={person.fatherName} allPeople={peoples} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
