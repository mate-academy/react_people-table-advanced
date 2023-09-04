import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams<{ slug: string }>();

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
        {person.mother ? (
          <Link
            to={`/people/${person.mother?.slug}`}
            className="has-text-danger"
          >
            {person.mother.name}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {person.father ? (
          <Link to={`/people/${person.father?.slug}`}>{person.father.name}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
