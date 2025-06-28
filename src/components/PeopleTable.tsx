/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types';
import { useFilters } from '../hooks/useFilters';
import { PeopleTableHeader } from './PeopleTableHeader';
import { useSearchParams } from 'react-router-dom';
import { PeopleCard } from './PeopleCard';

interface Props {
  people: Person[] | null;
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { filteredPeople } = useFilters(people);
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order') || 'asc';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleTableHeader sort={sort} order={order} />

      <tbody>
        {filteredPeople.map((person: Person) => {
          return (
            <PeopleCard person={person} key={person.slug} people={people} />
          );
        })}
      </tbody>
    </table>
  );
};
