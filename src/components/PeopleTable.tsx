/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useParams } from 'react-router-dom';

import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { PeopleTableHead } from './PeopleTableHead';
import { SortOrder } from '../types/SortOrder';

type Props = {
  filteredPeople: Person[];
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
};

export const PeopleTable: React.FC<Props> = ({
  filteredPeople,
  sortOrder,
  setSortOrder,
  searchParams,
  setSearchParams,
}) => {
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleTableHead
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <tbody>
        {filteredPeople.map(person => {
          const { sex, born, died, motherName, fatherName } = person;
          const mother = filteredPeople.find(p => p.name === person.motherName);
          const father = filteredPeople.find(p => p.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              className={slug === person.slug ? 'has-background-warning' : ''}
              data-cy="person"
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
