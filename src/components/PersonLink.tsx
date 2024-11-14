import classNames from 'classnames';
import { CompletePerson } from '../types';
import { Link, useParams } from 'react-router-dom';

type Props = {
  person: CompletePerson;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      key={person.name}
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({
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
        {person.mother ? (
          <Link
            to={`/people/${person.mother.slug}`}
            className={classNames({
              'has-text-danger': person.mother.sex === 'f',
            })}
          >
            {person.mother.name}
          </Link>
        ) : person.motherName ? (
          person.motherName
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.father ? (
          <Link
            to={`/people/${person.father.slug}`}
            className={classNames({
              'has-text-danger': person.father.sex === 'f',
            })}
          >
            {person.father.name}
          </Link>
        ) : person.fatherName ? (
          person.fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
