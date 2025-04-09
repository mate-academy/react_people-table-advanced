/* eslint-disable jsx-a11y/control-has-associated-label */
import { useFilteredPeople } from '../../utils';
import { TableHead } from './components';
import { TableBody } from './components';

export const PeopleTable = () => {
  const visiblePeople = useFilteredPeople();

  return visiblePeople.length === 0 ? (
    <p>There are no people matching the current search criteria</p>
  ) : (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHead />

      <TableBody people={visiblePeople} />
    </table>
  );
};
