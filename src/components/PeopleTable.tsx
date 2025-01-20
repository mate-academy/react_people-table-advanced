/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types/Person';
import { PersonLink } from '../components/PersonLink';

interface PeopleTableProps {
  people: Person[];
  slug?: string;
}


export const PeopleTable: React.FC<PeopleTableProps> = ({ people, slug }) => {


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
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Born</th>
                        <th>Died</th>
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
