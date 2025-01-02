import classNames from 'classnames';
import { Person } from '../types/Person/Person';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SexFilter } from '../types/SexFilter';
import { ErrorMessage } from '../types/ErrorMessage';
import { TableHead } from './TableHead';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[] | null;
  selectedPerson?: string | null;
};

const filterBySex = (people: Person[], filter: string) => {
  return filter === SexFilter.ALL
    ? people
    : people.filter(person => person.sex === filter);
};

const filterByQuery = (people: Person[], query: string) => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return people;
  }

  return people.filter(
    person =>
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery),
  );
};

const filterByCenturies = (people: Person[], centuries: string[]) => {
  return people.filter(person => {
    const bornCentury = Math.ceil(person.born / 100);
    const diedCentury = Math.ceil(person.died / 100);

    if (!centuries.length) {
      return people;
    }

    return (
      centuries.includes(`${bornCentury}`) ||
      centuries.includes(`${diedCentury}`)
    );
  });
};

export const PeopleTable: React.FC<Props> = ({ people, selectedPerson }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex') || SexFilter.ALL;
  const centuries = searchParams.getAll('centuries') || [];

  const peopleWithParents = people?.map(person => {
    const mother = people.find(parent => parent.name === person.motherName);
    const father = people.find(parent => parent.name === person.fatherName);

    return { ...person, mother, father };
  });

  let visiblePeople = filterBySex(peopleWithParents || [], sexFilter);

  visiblePeople = filterByQuery(visiblePeople, query);
  visiblePeople = filterByCenturies(visiblePeople, centuries);

  if (!visiblePeople.length) {
    return <p>{ErrorMessage.NoDataForQuery}</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHead />

      <tbody>
        {visiblePeople.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,
          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': person.slug === selectedPerson,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
