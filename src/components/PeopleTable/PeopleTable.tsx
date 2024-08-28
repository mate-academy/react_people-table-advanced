import { Person } from '../../types';
import { PeopleTableBody } from './PeopleTableBody';
import { PeopleTableHead } from './PeopleTableHead';

type Props = {
  selectedPersonSlug?: Person['slug'];
};

export const PeopleTable = ({ selectedPersonSlug }: Props) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleTableHead />

      <PeopleTableBody selectedPersonSlug={selectedPersonSlug} />
    </table>
  );
};
