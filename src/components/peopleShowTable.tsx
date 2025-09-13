import { Person } from '../types';
import PersonLink from './PersonLink';

interface Props {
  people: Person[];
  selectedPerson: Person | null;
}

const PeopleShowTable = ({ selectedPerson, people }: Props) => {
  return (
    <table className="table is-striped is-hoverable is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(p => {
          const mother =
            people.find(person => person.name === p.motherName) || null;
          const father =
            people.find(person => person.name === p.fatherName) || null;

          return (
            <tr
              key={p.slug}
              className={p === selectedPerson ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={p} />
              </td>
              <td>{p.sex}</td>
              <td>{p.born}</td>
              <td>{p.died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : p.motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : p.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PeopleShowTable;
