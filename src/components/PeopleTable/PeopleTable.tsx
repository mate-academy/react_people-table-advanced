import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { sortFunc } from '../../utils/sortBy';
import { visiblePeople } from '../../utils/visiblePeople';
import { PersonNavLink } from '../PersonNavLink/PersonNavLink';
import { SortLink } from '../SortLink';

type Props = {
  people: Person[],
  selectedSlug: string
};
export const PeopleTable:React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams] = useSearchParams();

  const currentQuery = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex');
  const currentCenturies = searchParams.getAll('centuries');
  const sortByField = searchParams.get('sort') as keyof Person;
  const isReverse = searchParams.get('order') === 'desc';

  const filterPeople = visiblePeople(
    people,
    currentQuery,
    currentSex,
    currentCenturies,
  );
  const sortedPeople = sortFunc(filterPeople, sortByField, isReverse);

  const tableSortFields = ['Name', 'Sex', 'Born', 'Died'];

  if (!filterPeople.length) {
    return (
      <p>No people for this query, rewrite your querry</p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableSortFields.map(field => (
            <SortLink key={field} field={field} />
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = people
            .find(mothe => mothe.name === person.motherName);
          const father = people
            .find(fathe => fathe.name === person.fatherName);
          const isSelectedPerson = selectedSlug === person.slug;
          const motherLink = person.motherName || '-';
          const fatherLink = person.fatherName || '-';

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames(
                {
                  'has-background-warning': isSelectedPerson,
                },
              )}
            >
              <td>
                <PersonNavLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{mother ? <PersonNavLink person={mother} /> : motherLink}</td>
              <td>{father ? <PersonNavLink person={father} /> : fatherLink}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
