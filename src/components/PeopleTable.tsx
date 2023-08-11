import React, { useContext } from 'react';
import { PeopleTableRow } from './PeopleTableRow';
import { PeopleSort } from './PeopleSort';
import { PeopleContext } from '../context/PeopleContext';

export const PeopleTable: React.FC = () => {
  const { peoples } = useContext(PeopleContext);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleSort />

      <tbody>
        {peoples.map((human) => (
          <PeopleTableRow key={human.slug} human={human} />
        ))}
      </tbody>
    </table>
  );
};
