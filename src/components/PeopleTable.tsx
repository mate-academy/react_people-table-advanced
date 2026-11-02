
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  selectedPerson: Person | null;
  onSelectPerson: (person: Person) => void;
  sort: string;
  order: string;
  onSort: (field: string) => void;
};

export const PeopleTable = ({
  people,
  selectedPerson,
  onSelectPerson,
  sort,
  order,
  onSort,
}: Props) => {
  const getArrow = (field: string) => {
    if (sort !== field) {
      return '↕';
    }

    return order === 'desc' ? '↓' : '↑';
  };

  const getClassName = (field: string) => {
    return sort === field ? 'has-text-weight-bold' : '';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
         <th
  className={getClassName('name')}
  onClick={() => onSort('name')}
>
  Name
</th>

<th
  className={getClassName('sex')}
  onClick={() => onSort('sex')}
>
  Sex
</th>

<th
  className={getClassName('born')}
  onClick={() => onSort('born')}
>
  Born
</th>

<th
  className={getClassName('died')}
  onClick={() => onSort('died')}
>
  Died
</th>



          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
        <tr
  key={person.slug}
  data-cy="person"
  className={
              selectedPerson?.slug === person.slug

                ? 'has-background-warning'
                : ''
            }
            onClick={() => onSelectPerson(person)}
          >
          <td>
<a
  href={`#/people/${person.slug}`}
  className={person.sex === 'f' ? 'has-text-danger' : 'has-text-link'}
>
  {person.name}
</a>
</td>

            <td>{person.sex}</td>

            <td>{person.born}</td>

            <td>{person.died}</td>

  <td>
  {person.motherName ? (
    people.some(p => p.name === person.motherName) ? (
      <a
        href={`#/people/${people.find(p => p.name === person.motherName)!.slug}`}
        className="has-text-danger"
      >
        {person.motherName}
      </a>
    ) : (
      person.motherName
    )
  ) : (
    '-'
  )}
</td>
<td>
  {person.fatherName ? (
    people.some(p => p.name === person.fatherName) ? (
      <a
        href={`#/people/${people.find(p => p.name === person.fatherName)!.slug}`}
        className="has-text-link"
      >
        {person.fatherName}
      </a>
    ) : (
      person.fatherName
    )
  ) : (
    '-'
  )}
</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
