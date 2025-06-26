import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

interface TableBodyProps {
  people: Person[];
  allPeople: Person[];
}

export const TableBody: React.FC<TableBodyProps> = ({ people, allPeople }) => {
  const { slug } = useParams();
  const selectedUserSlug = slug;

  return (
    <tbody>
      {people.map(person => {
        const mother =
          allPeople.find(parent => parent.name === person.motherName) || null;
        const father =
          allPeople.find(parent => parent.name === person.fatherName) || null;

        return (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': selectedUserSlug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} personName={person.name} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink person={mother} personName={person.motherName} />
            </td>

            <td>
              <PersonLink person={father} personName={person.fatherName} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};
