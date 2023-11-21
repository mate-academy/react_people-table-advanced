import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person,
  motherNameLink: string | undefined,
  fatherNameLink: string | undefined,
};

export const PersonLink: React.FC<Props> = ({
  person,
  motherNameLink,
  fatherNameLink,
}) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        { motherNameLink ? (
          <Link
            to={`/people/${motherNameLink}`}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        ) : (
          <>
            { person.motherName || '-'}
          </>
        )}
      </td>
      <td>
        { fatherNameLink ? (
          <Link
            to={`/people/${fatherNameLink}`}
          >
            {person.fatherName}
          </Link>
        ) : (
          <>
            { person.fatherName || '-'}
          </>
        )}
      </td>
    </tr>
  );
};
