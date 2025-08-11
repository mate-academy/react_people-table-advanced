/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { TableTitle } from './TableTitle';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <TableTitle />

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={
              person.slug === personSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {people.find(persName => person.motherName === persName.name) ? (
                <PersonLink
                  person={people.find(p => p.name === person.motherName)!}
                />
              ) : person.motherName ? (
                person.motherName
              ) : (
                '-'
              )}
            </td>
            <td>
              {people.find(persName => person.fatherName === persName.name) ? (
                <PersonLink
                  person={people.find(p => p.name === person.fatherName)!}
                />
              ) : person.fatherName ? (
                person.fatherName
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
