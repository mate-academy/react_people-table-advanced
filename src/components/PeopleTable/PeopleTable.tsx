import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  persons: Person[],
  selected: string,
};

export const PeopleTable: React.FC<Props> = ({ persons, selected }) => {
  const getPerson = (name: string | null) => {
    const finded = persons.find(people => people.name === name);

    return finded
      ? <PersonLink person={finded} />
      : name;
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
        {persons.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': person.slug === selected,
            })}
          >
            <td><PersonLink person={person} /></td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{getPerson(person.motherName ?? '-') }</td>
            <td>{getPerson(person.fatherName ?? '-') }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
