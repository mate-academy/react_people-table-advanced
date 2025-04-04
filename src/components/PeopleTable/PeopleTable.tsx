/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TableHeader } from './components/TableHeader';
import { TableBody } from './components/TableBody';

export const PeopleTable: React.FC = () => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHeader />
      <TableBody />
    </table>
  );
};
