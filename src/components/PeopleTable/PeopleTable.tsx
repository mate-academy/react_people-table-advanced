import { Person } from '../../types';
import { PeopleTableBody } from '../PeopleTableBody/PeopleTableBody';
import { PeopleTableHeadings } from '../PeopleTableHeadings';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleTableHeadings />

      <PeopleTableBody people={people} />
    </table>
  );
};
