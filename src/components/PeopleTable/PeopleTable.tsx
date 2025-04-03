/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { PeoplePageStateType } from '../PeoplePage';
import { TableHeader } from './components/TableHeader';
import { TableBody } from './components/TableBody';

export type PeopleTableProps = {
  setPeoplePageState: React.Dispatch<React.SetStateAction<PeoplePageStateType>>;
  peoplePageState: PeoplePageStateType;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  setPeoplePageState,
  peoplePageState,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHeader />
      <TableBody
        setPeoplePageState={setPeoplePageState}
        peoplePageState={peoplePageState}
      />
    </table>
  );
};
