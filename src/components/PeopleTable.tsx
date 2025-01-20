/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types/Person';
import { PersonLink } from '../components/PersonLink';

interface PeopleTableProps {
  people: Person[];
  slug?: string;
  setSortField: React.Dispatch<React.SetStateAction<'name' | 'born' | 'died' | undefined>>
  setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
}


export const PeopleTable: React.FC<PeopleTableProps> = ({ people, slug, setSortField, setSortOrder }) => {


  const isExist = (name: string) => {
    const person = people.find(p => p.name === name);
    return person ? <PersonLink person={person} /> : name;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th
            style={{cursor: 'pointer'}}
            onClick={() => {
              setSortField('name');
              setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
            }}
          >
            Name
          </th>
          <th>Sex</th>
          <th
            style={{cursor: 'pointer'}}
            onClick={() => {
              setSortField('born');
              setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
            }}
          >
            Born
          </th>
          <th
            style={{cursor: 'pointer'}}
            onClick={() => {
              setSortField('died')
              setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
            }}
          >
            Died
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <tr data-cy="person" key={person.slug} className={slug === person.slug ? 'has-background-warning' : ''}>
            <td><PersonLink person={person} /></td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{person.motherName ? isExist(person.motherName) : '-'}</td>
            <td>{person.fatherName ? isExist(person.fatherName) : '-'}</td>
            </tr>
          ))}
      </tbody>
  </table>
  );
};
