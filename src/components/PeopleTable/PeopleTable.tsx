import { useSearchParams } from 'react-router-dom';

import { Person } from '../../types';
import { sortPeopleBy } from '../../utils/sortPeopleBy';
import { getFilterPeople } from '../../utils/getFilterPeople';
import { useSortParams } from '../../hooks/useSortParams';

import { PersonRow } from '../PersonRow';
import { SortColumn } from '../SortColumn';

type Props = {
  people: Person[];
};

const SORT_COLUMNS = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { sortParam, orderParam } = useSortParams();
  const [searchParams] = useSearchParams();

  const visiblePeople = getFilterPeople(
    people,
    searchParams.get('query'),
    searchParams.get('sex'),
    searchParams.getAll('centuries'),
  );

  const sortedPeople = sortPeopleBy(visiblePeople, sortParam, orderParam);

  const findPerson = (peopleArray: Person[], personName: string | null) => {
    return peopleArray.find(person => person.name === personName);
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_COLUMNS.map(column => (
            <SortColumn key={column} column={column} />
          ))}

          <th>Mother</th>

          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const { motherName, fatherName } = person;

          const mother = findPerson(people, motherName);
          const father = findPerson(people, fatherName);

          return (
            <PersonRow
              key={person.slug}
              person={person}
              mother={mother}
              father={father}
            />
          );
        })}
      </tbody>
    </table>
  );
};
