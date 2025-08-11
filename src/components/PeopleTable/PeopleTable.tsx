import { Person } from '../../types';
import { tableHead } from '../../utils/TableHead';
import { PersonLink } from '../PersonLink';
import { SortLink } from '../SortLink/SortLink';

interface PeopleTableProps {
  people: Person[];
  selectedPersonSlug: string;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedPersonSlug,
}) => {
  const findPersonByName = (name: string | null) => {
    return people.find(person => person.name === name);
  };

  const hasPeople = people.length > 0;

  return hasPeople ? (
    <div className="box table-container">
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {tableHead.map(({ key, sort, title }) => (
              <th key={key}>
                {title}
                {sort && <SortLink sortValue={title} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map(person => {
            const mother = findPersonByName(person.motherName || '');
            const father = findPersonByName(person.fatherName || '');

            return (
              <tr
                key={person.slug}
                data-cy="person"
                className={
                  person.slug === selectedPersonSlug
                    ? 'has-background-warning'
                    : ''
                }
              >
                <td>
                  <PersonLink person={person} />
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    person.motherName || '-'
                  )}
                </td>
                <td>
                  {father ? (
                    <PersonLink person={father} />
                  ) : (
                    person.fatherName || '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <p data-cy="noPeopleMessage">
      There are no people matching the current search criteria.
    </p>
  );
};
