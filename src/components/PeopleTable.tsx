/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { preparePeople } from './preparePeople';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const filteredPeople = preparePeople(people, {
    sex,
    query,
    centuries,
    sort,
    order,
  });

  return filteredPeople.length ? (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHead />

      <TableBody people={people} filteredPeople={filteredPeople} />
    </table>
  ) : (
    <p>There are no people matching the current search criteria</p>
  );
};
