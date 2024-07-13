import { Person } from '../../types';
import { findRelative } from '../../utils/helpers';
import { TABLE_HEAD } from '../../utils/table.config';
import { TableRow } from './TableRow';
import { SortLink } from '../SortLink';

export interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => (
  <table
    data-cy="peopleTable"
    className="table is-striped is-hoverable is-narrow is-fullwidth"
  >
    <thead>
      <tr>
        {TABLE_HEAD.map(({ key, sort, title }) => (
          <th key={key}>
            {title}
            {sort && <SortLink sortValue={title} />}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {people.map(person => {
        const { fatherName, motherName } = person;

        const motherPerson =
          findRelative({ searchName: motherName, people }) || motherName;

        const fatherPeron =
          findRelative({ searchName: fatherName, people }) || fatherName;

        return (
          <TableRow
            key={person.slug}
            person={person}
            mother={motherPerson}
            father={fatherPeron}
          />
        );
      })}
    </tbody>
  </table>
);
