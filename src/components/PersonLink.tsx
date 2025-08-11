import { Link, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import cn from 'classnames';

type Props = {
  person: Person;
  peoples: Person[];
};

export const PeopleLink: React.FC<Props> = ({ person, peoples }) => {
  const { slug } = useParams();
  const isPersonExists = (name: string | null) =>
    peoples.some(onePerson => onePerson.name === name);

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {isPersonExists(person.motherName) ? (
          <Link
            className="has-text-danger"
            to={`/people/${peoples.find(people => people.name === person.motherName)?.slug}`}
          >
            {person.motherName ? person.motherName : '-'}
          </Link>
        ) : (
          <p>{person.motherName ? person.motherName : '-'}</p>
        )}
      </td>

      <td>
        {isPersonExists(person.fatherName) ? (
          <Link
            to={`/people/${peoples.find(people => people.name === person.fatherName)?.slug}`}
          >
            {person.fatherName ? person.fatherName : '-'}
          </Link>
        ) : (
          <p>{person.fatherName ? person.fatherName : '-'}</p>
        )}
      </td>
    </tr>
  );
};
