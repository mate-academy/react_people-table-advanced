import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
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
        {people.map(person => {
          const isSelected = person.slug === selectedSlug;
          const motherCell = (() => {
            if (!person.motherName) {
              return '-';
            }

            if (person.mother) {
              return <PersonLink person={person.mother} />;
            }

            return person.motherName;
          })();

          const fatherCell = (() => {
            if (!person.fatherName) {
              return '-';
            }

            if (person.father) {
              return <PersonLink person={person.father} />;
            }

            return person.fatherName;
          })();

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{motherCell}</td>
              <td>{fatherCell}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
