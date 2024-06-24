/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';
import { useSearchParams } from 'react-router-dom';
import { PeopleSort } from './PeopleSort';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sortColumn = searchParams.get('sort') || null;
  const isReversed = searchParams.get('order') === 'desc';
  const peopleList = people?.map(person => ({
    ...person,
    mother: people.find(personItem => personItem.name === person.motherName),
    father: people.find(personItem => personItem.name === person.fatherName),
  }));

  const preparedPeople = [...peopleList];

  if (sortColumn) {
    preparedPeople.sort((personA, personB) => {
      switch (sortColumn) {
        case 'name':
          return personA.name.localeCompare(personB.name);
        case 'sex':
          return personA.sex.localeCompare(personB.sex);
        case 'born':
          return personA.born - personB.born;
        case 'died':
          return personA.died - personB.died;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedPeople.reverse();
  }

  const tableColumnNames = ['name', 'sex', 'born', 'died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        {!!preparedPeople.length ? (
          <tr>
            {tableColumnNames.map(columnName => (
              <th key={columnName}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {columnName[0].toUpperCase() + columnName.slice(1)}
                  <PeopleSort sortName={columnName} />
                </span>
              </th>
            ))}

            <th>Mother</th>
            <th>Father</th>
          </tr>
        ) : (
          <p>There are no people matching the current search criteria</p>
        )}
      </thead>

      <tbody>
        {preparedPeople.map(person => (
          <PeopleLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
