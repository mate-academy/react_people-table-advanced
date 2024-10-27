import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  father?: Person;
  mother?: Person;
};

export const PersonInfo: React.FC<Props> = ({ person, father, mother }) => {
  const { slug } = useParams();

  return (
    <tr
      key={person.slug}
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{father.name}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
