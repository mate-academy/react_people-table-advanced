import { Person } from '../../types';
import { TableBoby } from '../TableBody/TableBoby';
import { TableHead } from '../TableHead';

type Props = {
  people: Person[];
};

export const Table: React.FC<Props> = ({ people }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <TableHead />
    <TableBoby people={people} />
  </table>
);
