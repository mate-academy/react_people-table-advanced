import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
          to={`../${person.slug}`}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother?.slug ? (
          <Link className="has-text-danger" to={`../${person.mother.slug}`}>
            {person.motherName || '-'}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {person.father?.slug ? (
          <Link to={`../${person.father.slug}`}>
            {person.fatherName || '-'}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
