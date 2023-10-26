import { useContext } from 'react';
import { appContext } from '../../storage/AppContext/AppContext';
import { PersonItem } from '../PersonItem/PersonItem';
import { SortButton } from './SortButton';

export const PeopleTable = () => {
  const { visiblePeople } = useContext(appContext);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <SortButton sortBy="name">Name</SortButton>
          </th>

          <th>
            <SortButton sortBy="sex">Sex</SortButton>
          </th>

          <th>
            <SortButton sortBy="born">Born</SortButton>
          </th>

          <th>
            <SortButton sortBy="died">Died</SortButton>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {visiblePeople.map((person) => (
          <PersonItem person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
