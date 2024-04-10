import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { getFilterPeople } from '../../utils/getFilteredPeople';
import { PersonLink } from '../PersonLink/PersonLink';
import { sortPeopleBy } from '../../utils/sortPeopleBy';
import { SortColumns } from '../SortColumns/SortColumns';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

const SORT_COLUMNS = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const preparedPeople = people?.map(person => ({
    ...person,
    mother: people.find(personItem => personItem.name === person.motherName),
    father: people.find(personItem => personItem.name === person.fatherName),
  }));
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || '';
  const orderParam = searchParams.get('order') || '';

  const visiblePeople = getFilterPeople(
    preparedPeople,
    searchParams.get('query'),
    searchParams.get('sex'),
    searchParams.getAll('centuries'),
  );

  const sortedPeople = sortPeopleBy(visiblePeople, sortParam, orderParam);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {visiblePeople.length > 0 ? (
        <>
          <thead>
            <tr>
              {SORT_COLUMNS.map((column: string) => (
                <SortColumns key={column} column={column} />
              ))}

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <tbody>
            {sortedPeople?.map(person => (
              <PersonLink key={person.slug} person={person} />
            ))}
          </tbody>
        </>
      ) : (
        <h1>There are no people matching the current search criteria</h1>
      )}
    </table>
  );
};
